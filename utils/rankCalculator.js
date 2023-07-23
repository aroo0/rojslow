// rankCalculator.js

const rankLevels = [
  { minLikes: 300, title: 'Okrzemki' },
  { minLikes: 150, title: 'Ukwiały' },
  { minLikes: 100, title: 'Wiciowce' },
  { minLikes: 50, title: 'Toczki' },
  { minLikes: 25, title: 'Klejnotki' },
  { minLikes: 10, title: 'Pantofeleki' },
  { minLikes: 0, title: 'Ameby' },
  ];
  
  // Function to calculate the user's rank based on the like count
export function rankCalculator(likeCount) {
  const rank = rankLevels.find((level) => likeCount >= level.minLikes);

    return rank ? rank.title : 'Nieznane pochodzenie';
}

