'use client'

import { AlertCircle } from 'lucide-react'

export function Disclaimer() {
  return (
    <section className="py-16 space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold">Medical Disclaimer</h2>
        <p className="text-lg text-muted-foreground">
          Important information about the use of this diagnostic support system
        </p>
      </div>

      <div className="p-8 rounded-xl border border-warning/50 bg-warning/5 space-y-6">
        <div className="flex gap-4">
          <AlertCircle className="h-6 w-6 text-warning flex-shrink-0 mt-1" />
          <div className="space-y-4 text-sm">
            <p className="leading-relaxed">
              This Malaria Stage Detector is an <span className="font-semibold">AI-powered diagnostic support tool</span> designed to assist medical professionals in the identification of malaria parasite stages in blood smear microscopy images.
            </p>

            <div className="space-y-3 pt-4 border-t border-warning/20">
              <h3 className="font-semibold text-foreground">Important Terms of Use:</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>This tool is NOT a replacement for professional medical diagnosis or laboratory confirmation.</li>
                <li>Results should always be reviewed and verified by qualified medical professionals.</li>
                <li>The system accuracy is 98% on validation datasets but may vary with image quality and preparation.</li>
                <li>Clinical decisions should not be made based solely on this tool&apos;s output.</li>
                <li>Medical practitioners retain full responsibility for patient diagnosis and treatment.</li>
                <li>All patient data is treated confidentially and processed securely.</li>
              </ul>
            </div>

            <div className="space-y-3 pt-4 border-t border-warning/20">
              <h3 className="font-semibold text-foreground">Limitations:</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Results depend heavily on microscopy image quality and staining procedures.</li>
                <li>Poor quality images may result in reduced accuracy.</li>
                <li>The system may not detect parasites at very early infection stages.</li>
                <li>Mixed infections or rare parasite species may not be accurately identified.</li>
              </ul>
            </div>

            <div className="space-y-3 pt-4 border-t border-warning/20">
              <h3 className="font-semibold text-foreground">Recommendations:</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Always follow your institution&apos;s standard diagnostic protocols.</li>
                <li>Use high-quality microscopy images prepared according to standard procedures.</li>
                <li>Verify results with additional laboratory tests if necessary.</li>
                <li>Report any discrepancies to medical supervisors and specialists.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>

        <div className="space-y-4">
          {[
            {
              q: 'How accurate is the detection system?',
              a: 'The system achieves 98% accuracy on our validation dataset of 10,000+ labeled images. However, real-world accuracy may vary depending on image quality and preparation methods.',
            },
            {
              q: 'Can this replace laboratory confirmation?',
              a: 'No, this tool is designed as a support system for medical professionals. Laboratory confirmation and expert review are essential for any clinical decision.',
            },
            {
              q: 'What image formats are supported?',
              a: 'The system supports JPG, PNG, and WebP formats. Images should be high resolution (at least 1024x1024 pixels) for optimal results.',
            },
            {
              q: 'How is my data handled?',
              a: 'All uploaded images and results are encrypted and processed securely. We comply with HIPAA and other healthcare data protection regulations.',
            },
            {
              q: 'Can the system detect mixed infections?',
              a: 'The current version is optimized for single-species detection. Mixed infections may require additional laboratory confirmation.',
            },
          ].map((faq, index) => (
            <div key={index} className="p-6 rounded-lg border border-border bg-card space-y-2">
              <h4 className="font-semibold">{faq.q}</h4>
              <p className="text-sm text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
