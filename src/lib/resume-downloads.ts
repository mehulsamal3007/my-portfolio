import type { SiteContent } from '../data/portfolio'

async function getPortraitJpeg(photoUrl: string): Promise<Uint8Array | null> {
  if (!photoUrl) return null

  try {
    const response = await fetch(photoUrl)
    if (!response.ok) return null

    const bitmap = await createImageBitmap(await response.blob())
    const scale = Math.min(1, 900 / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    const context = canvas.getContext('2d')
    if (!context) return null
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    bitmap.close()

    const jpeg = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.86))
    return jpeg ? new Uint8Array(await jpeg.arrayBuffer()) : null
  } catch {
    return null
  }
}

function filenameFor(content: SiteContent, extension: string) {
  const safeName = content.profile.name.trim().replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '')
  const phone = content.contact.phone.replace(/\D/g, '')
  const baseName = [safeName, phone].filter(Boolean).join('_') || 'Resume'
  return `${baseName}.${extension}`
}

function contactLine(content: SiteContent) {
  return [content.profile.availability, content.contact.email, content.contact.phone, content.contact.linkedin]
    .filter(Boolean)
    .join('  |  ')
}

function resumeSections(content: SiteContent) {
  return [
    {
      title: 'PROFESSIONAL SUMMARY',
      paragraphs: [content.about.heading, content.profile.intro, ...content.about.paragraphs],
    },
    {
      title: 'CAREER HIGHLIGHTS',
      paragraphs: [
        `${content.hero.qualityLabel}: ${content.hero.qualityTitle}`,
        `${content.hero.automationLabel}: ${content.hero.automationValue}`,
        `${content.hero.frameworkLabel}: ${content.hero.frameworkValue}`,
        ...content.about.stats.map((stat) => `${stat.label}: ${stat.value}`),
        ...content.hero.coverage.map((item) => `${content.hero.coverageLabel} - ${item.label}: ${item.value}%`),
      ],
    },
    {
      title: 'TECHNICAL SKILLS',
      paragraphs: [
        content.skillsSection.heading,
        ...content.hero.badges.map((badge) => `Core skill: ${badge}`),
        ...content.skillsSection.groups.map((group) => `${group.title}: ${group.items.join(', ')}`),
        `Technologies: ${content.techMarquee.join(', ')}`,
      ],
    },
    {
      title: 'PROFESSIONAL EXPERIENCE',
      paragraphs: [content.experienceSection.heading, ...content.experienceSection.items.flatMap((item) => [
        `${item.company} | ${item.role} | ${item.period}`,
        ...item.responsibilities.map((responsibility) => `• ${responsibility}`),
      ])],
    },
    {
      title: content.automationSection.eyebrow.toUpperCase(),
      paragraphs: [
        content.automationSection.heading,
        ...content.automationSection.steps.map((step) => `${step.title}: ${step.description}`),
      ],
    },
    {
      title: content.projectsSection.eyebrow.toUpperCase(),
      paragraphs: content.projectsSection.items.flatMap((project) => [
        ...(project === content.projectsSection.items[0] ? [content.projectsSection.heading, content.projectsSection.intro] : []),
        `${project.title} (${project.status}) | ${project.technologies.join(', ')}`,
        project.description,
      ]),
    },
    {
      title: content.terminal.title.toUpperCase(),
      paragraphs: content.terminal.lines,
    },
  ]
}

export async function downloadResumePdf(content: SiteContent) {
  const { jsPDF } = await import('jspdf')
  const pdf = new jsPDF({ unit: 'pt', format: 'a4' })
  const portrait = await getPortraitJpeg(content.profile.photoUrl)
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 44
  const usableWidth = pageWidth - margin * 2
  let y = margin

  if (portrait) {
    pdf.addImage(portrait, 'JPEG', pageWidth - margin - 76, y, 76, 95)
  }

  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(22)
  pdf.setTextColor(15, 35, 50)
  pdf.text(content.profile.name, margin, y + 24, { maxWidth: portrait ? usableWidth - 95 : usableWidth })
  y += 43

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(11)
  pdf.setTextColor(30, 105, 125)
  pdf.text(content.profile.title, margin, y)
  y += 20

  pdf.setFontSize(8)
  pdf.setTextColor(80, 90, 100)
  const contactLines = pdf.splitTextToSize(contactLine(content), portrait ? usableWidth - 95 : usableWidth)
  pdf.text(contactLines, margin, y)
  y += Math.max(18, contactLines.length * 10 + 8)
  if (portrait) y = Math.max(y, margin + 108)

  const ensureSpace = (height: number) => {
    if (y + height > pageHeight - margin) {
      pdf.addPage()
      y = margin
    }
  }

  for (const section of resumeSections(content)) {
    ensureSpace(32)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(11)
    pdf.setTextColor(15, 105, 125)
    pdf.text(section.title, margin, y)
    y += 16

    for (const paragraph of section.paragraphs) {
      const isBullet = paragraph.startsWith('• ')
      const text = isBullet ? paragraph.slice(2) : paragraph
      const indent = isBullet ? 12 : 0
      pdf.setFont('helvetica', isBullet ? 'normal' : paragraph.includes(' | ') ? 'bold' : 'normal')
      pdf.setFontSize(isBullet ? 9 : 9.5)
      pdf.setTextColor(45, 52, 60)
      const lines = pdf.splitTextToSize(text, usableWidth - indent)
      ensureSpace(lines.length * 12 + 4)
      pdf.text(lines, margin + indent, y)
      y += lines.length * 12 + (isBullet ? 4 : 7)
    }
    y += 3
  }

  pdf.save(filenameFor(content, 'pdf'))
}

export async function downloadResumeWord(content: SiteContent) {
  const { Document, HeadingLevel, ImageRun, Packer, Paragraph, TextRun } = await import('docx')
  const portrait = await getPortraitJpeg(content.profile.photoUrl)
  const children = [
    ...(portrait ? [new Paragraph({ children: [new ImageRun({ data: portrait, type: 'jpg', transformation: { width: 92, height: 115 } })] })] : []),
    new Paragraph({ text: content.profile.name, heading: HeadingLevel.TITLE, spacing: { after: 80 } }),
    new Paragraph({ children: [new TextRun({ text: content.profile.title, bold: true, color: '176B7A', size: 24 })], spacing: { after: 100 } }),
    new Paragraph({ children: [new TextRun({ text: contactLine(content), color: '59636E', size: 18 })], spacing: { after: 240 } }),
  ]

  for (const section of resumeSections(content)) {
    children.push(new Paragraph({ text: section.title, heading: HeadingLevel.HEADING_1, spacing: { before: 180, after: 80 } }))
    for (const paragraph of section.paragraphs) {
      if (paragraph.startsWith('• ')) {
        children.push(new Paragraph({ text: paragraph.slice(2), bullet: { level: 0 }, spacing: { after: 45 } }))
      } else {
        const isRole = paragraph.includes(' | ')
        children.push(new Paragraph({
          children: [new TextRun({ text: paragraph, bold: isRole })],
          spacing: { after: isRole ? 80 : 100 },
        }))
      }
    }
  }

  const document = new Document({
    creator: content.profile.name,
    title: `${content.profile.name} Resume`,
    sections: [{ properties: { page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } } }, children }],
  })
  const blob = await Packer.toBlob(document)
  const url = URL.createObjectURL(blob)
  const anchor = window.document.createElement('a')
  anchor.href = url
  anchor.download = filenameFor(content, 'docx')
  anchor.click()
  URL.revokeObjectURL(url)
}