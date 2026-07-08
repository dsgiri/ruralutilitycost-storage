import sys

def modify_file(filepath, faqs_data_str):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find where <CalculatorPageLayout is called
    index = content.find('<CalculatorPageLayout')
    if index == -1:
        return
    
    # insert faqsData just before faq={faq}
    insert_str = f"\n      faqsData={{{faqs_data_str}}}"
    
    # Find faq={faq}
    faq_idx = content.find('faq={faq}', index)
    if faq_idx != -1:
        new_content = content[:faq_idx] + insert_str[1:] + "\n      " + content[faq_idx:]
        with open(filepath, 'w') as f:
            f.write(new_content)

modify_file('src/pages/tools/StoreOrSellCalculator.tsx', """[
  { question: "Should I store my corn or sell it now?", answer: "The decision comes down to your local basis, expected futures carry, and your exact carry costs. This calculator reveals your carry cost. If the market is not offering a premium higher than your breakeven, selling now is mathematically safer." },
  { question: "How much does it cost to store grain on farm per month?", answer: "While physical costs (fans, depreciation) often run 3-6 cents per bushel per month, the hidden cost is interest. At 7% interest on $5.00 corn, you are losing nearly 3 cents per bushel per month in opportunity cost alone. Total costs typically range from 6 to 12 cents per month." },
  { question: "Why is my interest cost so high?", answer: "Grain in a bin represents tied-up cash. If you sold it today, you could pay down a loan at 7-9% or put it in a high-yield account at 5%. Storing grain means you forfeit that return, which is a real financial cost that must be covered by a future price rally." }
]""")

modify_file('src/pages/tools/SpoilageRiskAssessor.tsx', """[
  { question: "How long can grain be stored before it spoils?", answer: "It depends entirely on moisture and temperature. Corn at 15% moisture and 40°F can easily store for over a year. That same corn at 20% moisture and 70°F can begin molding in less than two weeks." },
  { question: "What happens if grain gets too warm?", answer: "Warm grain increases the respiration rate of the seed and exponentially increases mold and insect activity. Moisture migration will also occur as warm air rises, condensing on the cold roof and raining back down, causing crusting at the top of the bin." },
  { question: "How does aeration help?", answer: "Aeration serves primarily to cool the grain mass and equalize temperatures, stopping moisture migration. Unless you have high-capacity fans specifically sized for natural air drying, aeration is for temperature control, not moisture removal." }
]""")

modify_file('src/pages/tools/GrainBinCapacity.tsx', """[
  { question: "How accurate is a bin capacity estimate?", answer: "Estimates are usually within 3-5% of actual. The biggest variable is the pack factor, which changes based on test weight, moisture, and how the grain was dropped into the bin (e.g. using a spreader vs a single spout)." },
  { question: "What is grain pack factor?", answer: "Grain at the bottom of a bin is crushed slightly by the weight of the grain above it, removing air space. This means a 40-foot tall bin holds slightly more bushels than two 20-foot tall bins of the same diameter." },
  { question: "How do I measure the peak height?", answer: "Peak height is the vertical distance from the eave (top of the straight wall) to the top of the grain cone. You can estimate this by knowing the angle of repose for your grain (typically 22-28 degrees for corn and soybeans)." }
]""")

