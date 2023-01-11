import router from '@/router';

export const goToGamePage = (gameId) => {
  const params = {
    gameId: gameId,
  };

  router.push({
    name: 'Match details',
    params: {
      id: params.gameId,
    },
  });
};
