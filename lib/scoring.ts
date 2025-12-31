const scoringKey: Record<string, number[]> = {
  // mane 6 - core (25 each)
  twilight_sparkle: [
    111, 113, 115, 117, 118, 120, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 151, 153, 157, 158, 171, 173,
    177, 179,
  ],
  rainbow_dash: [
    112, 119, 146, 159, 169, 371, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407,
    408, 409,
  ],
  applejack: [
    1, 5, 17, 161, 164, 181, 188, 189, 210, 218, 237, 341, 349, 354, 368, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  ],
  rarity: [
    5, 25, 27, 29, 311, 312, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 345, 351, 369,
    238,
  ],
  fluttershy: [
    2, 3, 13, 15, 18, 315, 372, 374, 464, 467, 490, 126, 127, 128, 129, 130, 131, 132, 133, 251, 252, 253, 254, 255,
    256,
  ],
  pinkie_pie: [
    19, 23, 82, 83, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 378, 455, 468, 497, 63, 64, 65, 66, 67, 68, 69,
  ],

  // cutie mark crusaders (5 each)
  apple_bloom: [162, 169, 184, 356, 501],
  scootaloo: [2, 13, 100, 234, 314],
  sweetie_belle: [20, 155, 311, 318, 345],

  // pillars of old equestria (7 each)
  star_swirl_the_bearded: [113, 118, 126, 379, 479, 483, 504],
  mage_meadowbrook: [15, 182, 190, 315, 505, 506, 507],
  rockhoof: [181, 185, 349, 508, 509, 510, 511],
  flash_magnus: [371, 376, 472, 512, 513, 514, 515],
  somnambula: [388, 475, 481, 484, 516, 517, 518],
  mistmane: [25, 27, 369, 519, 520, 521, 522],
  stygian: [232, 236, 302, 308, 350, 480, 523],

  // royal sisters & cadance (9 each)
  princess_celestia: [75, 126, 187, 375, 380, 381, 474, 526, 527],
  princess_luna: [20, 24, 306, 309, 385, 486, 493, 528, 451],
  princess_cadance: [235, 237, 243, 388, 451, 457, 456, 458, 459],

  // major reformed antagonists (12 each)
  discord: [94, 98, 99, 100, 382, 472, 478, 497, 305, 460, 461, 463],
  starlight_glimmer: [16, 30, 97, 162, 163, 186, 236, 386, 493, 384, 494, 466],
  sunset_shimmer: [19, 94, 301, 306, 309, 451, 475, 491, 470, 471, 473, 476],
  trixie: [83, 318, 452, 453, 472, 477, 478, 480, 481, 482, 483, 484],
  tempest_shadow: [232, 29, 232, 376, 459, 491, 485, 486, 487, 488, 489, 490],
  chrysalis: [6, 17, 21, 26, 28, 227, 310, 383, 389, 491, 492, 494],
  cozy_glow: [234, 238, 239, 240, 453, 454, 495, 496, 498, 499, 500, 501],

  // student six (6 each)
  gallus: [12, 92, 116, 233, 234, 273],
  silverstream: [89, 96, 320, 455, 508, 509],
  smolder: [14, 16, 26, 116, 234, 516],
  yona: [181, 455, 457, 349, 523, 524],
  sandbar: [161, 164, 168, 474, 488, 453],
  ocellus: [10, 84, 111, 456, 467, 460],

  // extended cast & background favourites (6 each)
  spike: [8, 22, 231, 244, 247, 460],
  big_macintosh: [17, 161, 461, 473, 474, 475],
  maud_pie: [157, 319, 490, 482, 483, 484],
  derpy_hooves: [4, 87, 468, 491, 492, 493],
  vinyl_scratch: [92, 313, 320, 500, 501, 502],
  octavia_melody: [91, 155, 458, 471, 509, 510],
  lyra_heartstrings: [317, 483, 517, 518, 519, 520],
  cheese_sandwich: [23, 90, 378, 527, 528, 451],
  tree_hugger: [94, 114, 315, 226, 458, 459],
  thorax: [10, 97, 310, 226, 466, 467],
  dragon_lord_ember: [125, 127, 376, 474, 475, 476],
}

export interface CharacterScore {
  name: string
  score: number
  percentage: number // added percentage field
}

export const characterCategories = {
  mane_6: ["twilight_sparkle", "rainbow_dash", "applejack", "rarity", "fluttershy", "pinkie_pie"],
  cutie_mark_crusaders: ["apple_bloom", "scootaloo", "sweetie_belle"],
  pillars: [
    "star_swirl_the_bearded",
    "mage_meadowbrook",
    "rockhoof",
    "flash_magnus",
    "somnambula",
    "mistmane",
    "stygian",
  ],
  royalty: ["princess_celestia", "princess_luna", "princess_cadance"],
  reformed_antagonists: [
    "discord",
    "starlight_glimmer",
    "sunset_shimmer",
    "trixie",
    "tempest_shadow",
    "chrysalis",
    "cozy_glow",
  ],
  student_six: ["gallus", "silverstream", "smolder", "yona", "sandbar", "ocellus"],
  extended_cast: [
    "spike",
    "big_macintosh",
    "maud_pie",
    "derpy_hooves",
    "vinyl_scratch",
    "octavia_melody",
    "lyra_heartstrings",
    "cheese_sandwich",
    "tree_hugger",
    "thorax",
    "dragon_lord_ember",
  ],
}

export interface QuizResults {
  primary: CharacterScore
  secondary: CharacterScore
  secondaryNonMane: CharacterScore // added secondary non-mane six result
  top5: CharacterScore[]
  categoryTopScores: Record<string, CharacterScore> // added top score per category
  cutieMark: string | null
}

export function calculateResults(answers: number[]): QuizResults {
  const scores: Record<string, number> = {}

  // initialize all characters with 0 score
  Object.keys(scoringKey).forEach((character) => {
    scores[character] = 0
  })

  // calculate scores
  answers.forEach((answer, index) => {
    const questionNumber = index + 1

    // regular scoring
    Object.entries(scoringKey).forEach(([character, questions]) => {
      if (questions.includes(questionNumber)) {
        scores[character] += answer
      }
    })
  })

  const maxScores: Record<string, number> = {}
  Object.entries(scoringKey).forEach(([character, questions]) => {
    maxScores[character] = questions.length * 5 // max answer value is 5
  })

  // sort by score
  const sortedScores = Object.entries(scores)
    .map(([name, score]) => ({
      name,
      score,
      percentage: maxScores[name] > 0 ? Math.round((score / maxScores[name]) * 100) : 0, // calculate percentage
    }))
    .sort((a, b) => b.score - a.score)

  const secondaryNonMane = sortedScores.find((s) => !characterCategories.mane_6.includes(s.name)) || sortedScores[1]

  const categoryTopScores: Record<string, CharacterScore> = {}
  Object.entries(characterCategories).forEach(([category, characters]) => {
    const topInCategory = sortedScores.filter((s) => characters.includes(s.name)).sort((a, b) => b.score - a.score)[0]
    if (topInCategory) {
      categoryTopScores[category] = topInCategory
    }
  })

  // determine cutie mark indicator based on top characters
  const cutieMark = determineCutieMark(sortedScores[0].name, sortedScores[1].name)

  return {
    primary: sortedScores[0],
    secondary: sortedScores[1],
    secondaryNonMane, // added non-mane secondary
    top5: sortedScores.slice(0, 5),
    categoryTopScores, // added category breakdown
    cutieMark,
  }
}

function determineCutieMark(primary: string, secondary: string): string | null {
  const markMap: Record<string, string> = {
    twilight_sparkle: "knowledge & magic",
    rainbow_dash: "speed & loyalty",
    applejack: "honesty & hard work",
    rarity: "beauty & generosity",
    fluttershy: "kindness & nature",
    pinkie_pie: "laughter & joy",
    princess_celestia: "leadership & wisdom",
    princess_luna: "dreams & night",
    starlight_glimmer: "transformation & magic",
    sunset_shimmer: "redemption & friendship",
    discord: "chaos & creativity",
  }

  return markMap[primary] || "unique & undiscovered"
}
