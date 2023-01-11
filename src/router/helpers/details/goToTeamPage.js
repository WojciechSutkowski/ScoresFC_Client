import router from '@/router';

export const goToTeamPage = (teamId) => {
  const params = {
    id: teamId,
  };

  router.push({
    name: 'Team details',
    params: {
      id: params.id,
    },
  });
};
