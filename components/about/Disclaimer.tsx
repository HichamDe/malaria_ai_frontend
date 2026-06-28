'use client'

import { AlertCircle } from 'lucide-react'

export function Disclaimer() {
  return (
    <section className="py-16 space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Medical Disclaimer</h2>
        <p className="text-lg text-muted-foreground">
          Important information about the use of this diagnostic support system
        </p>
      </div>

      <div className="p-8 rounded-xl border border-warning/50 bg-warning/5 space-y-6">
        <div className="flex gap-4">
          <AlertCircle className="h-6 w-6 text-warning flex-shrink-0 mt-1" />
          <div className="space-y-4 text-sm">
            <p className="leading-relaxed">
              MalariaScope is a <span className="font-semibold">research and educational tool</span> that assists with identifying malaria infection and parasite stages in single-cell blood-smear images. It is not a certified medical device.
            </p>

            <div className="space-y-3 pt-4 border-t border-warning/20">
              <h3 className="font-semibold text-foreground">Important Terms of Use:</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>This is a research and educational tool, NOT a medical diagnostic device.</li>
                <li>It is not a replacement for professional diagnosis or laboratory confirmation.</li>
                <li>Results must always be reviewed and verified by qualified medical professionals.</li>
                <li>Model outputs are probabilities, not guarantees; accuracy varies with image quality and preparation.</li>
                <li>Clinical decisions should not be made based solely on this tool&apos;s output.</li>
                <li>Medical practitioners retain full responsibility for patient diagnosis and treatment.</li>
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
              a: 'Performance depends on image quality, staining and preparation. Treat every output as a probability that requires expert review — no fixed accuracy figure is claimed here.',
            },
            {
              q: 'Can this replace laboratory confirmation?',
              a: 'No. This tool is a support system for medical professionals. Laboratory confirmation and expert review are essential for any clinical decision.',
            },
            {
              q: 'What image formats are supported?',
              a: 'JPG, PNG and WebP, up to 20 MB. Inputs should be single-cell thin-smear crops in the NIH cell-images format the models were trained on.',
            },
            {
              q: 'How is my data handled?',
              a: 'Uploaded images are sent to the detection backend for inference and are not part of a validated clinical data-handling regime. Do not upload identifiable patient data.',
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
