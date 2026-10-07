import { ScriptureConfig } from "../src/types/wedding";

export const defaultScriptures: Record<string, ScriptureConfig> = {
  love: {
    reference: "1 Corinthians 13:4–8",
    translation: "NIV / ESV Compatible Excerpt",
    theme: "LOVE",
    text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres. Love never fails.",
    shortText: "Love is patient, love is kind. Love never fails.",
    contextNote: "Reflecting God's agape love as the cornerstone of holy matrimony."
  },
  covenant: {
    reference: "Ecclesiastes 4:9–12",
    translation: "Selected Translation",
    theme: "COVENANT",
    text: "Two are better than one, because they have a good return for their labor. If either of them falls down, one can help the other up. Though one may be overpowered, two can defend themselves. A cord of three strands is not quickly broken.",
    shortText: "A cord of three strands is not quickly broken.",
    contextNote: "Two lives bound together with Christ as the unshakeable third strand."
  },
  harmony: {
    reference: "Colossians 3:14",
    translation: "Selected Translation",
    theme: "BLESSING",
    text: "And over all these virtues put on love, which binds them all together in perfect unity.",
    shortText: "Put on love, which binds everything together in perfect harmony.",
    contextNote: "The supreme virtue that cements a holy union."
  },
  benediction: {
    reference: "1 Corinthians 16:14",
    translation: "Selected Translation",
    theme: "FINAL BLESSING",
    text: "Let all that you do be done in love.",
    shortText: "Let all that you do be done in love.",
    contextNote: "A sacred commission as we step into our shared future."
  }
};
