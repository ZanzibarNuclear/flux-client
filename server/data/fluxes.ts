export let fluxes = [
  {
    id: 1,
    author: {
      displayName: "John Doe",
      handle: "johndoe",
      avatar: "https://api.dicebear.com/6.x/initials/svg?seed=JDo",
    },
    content: "This is a sample flux. #FirstFlux",
    timestamp: new Date().toISOString(),
    replyCount: 2,
    boostCount: 0,
    viewCount: 10,
    userReaction: {
      boosted: false,
      replied: true,
    }
  },
  {
    id: 2,
    author: {
      displayName: "Jane Dear",
      handle: "janedoe",
      avatar: "https://api.dicebear.com/6.x/initials/svg?seed=JDe",
    },
    content: "This is another sample flux. Fluxing is fun. Always flux before you leave in the morning. #FluxYourPower",
    timestamp: new Date().toISOString(),
    replyCount: 2,
    boostCount: 100,
    viewCount: 37,
    userReaction: {
      boosted: false,
      replied: false,
    }
  },
  {
    id: 3,
    author: {
      displayName: "Jack Inthebox",
      handle: "jackinthebox",
      avatar: "https://api.dicebear.com/6.x/initials/svg?seed=JI",
    },
    content: "Jack is back, with sourdough like you've never tasted before. #SourdoughRules",
    timestamp: new Date().toISOString(),
    replyCount: 42,
    boostCount: 200,
    viewCount: 3737,
    userReaction: {
      boosted: false,
      replied: false,
    }
  },
  {
    id: 4,
    author: {
      displayName: "Jane Dear",
      handle: "janedoe",
      avatar: "https://api.dicebear.com/6.x/initials/svg?seed=JDe",
    },
    content: "Sometime inspiration arrives just when you need it most.",
    parentId: 1,
    timestamp: new Date().toISOString(),
    replyCount: 2,
    boostCount: 550,
    viewCount: 3700,
    userReaction: {
      boosted: true,
      replied: true,
    }
  },
  {
    id: 5,
    author: {
      displayName: "Jane Dear",
      handle: "janedoe",
      avatar: "https://api.dicebear.com/6.x/initials/svg?seed=JDe",
    },
    content: "It's the little things that matter.",
    timestamp: new Date().toISOString(),
    replyCount: 2,
    boostCount: 1,
    viewCount: 3,
    userReaction: {
      boosted: false,
      replied: false,
    }
  },
  {
    id: 201,
    author: {
      displayName: "Jane Dear",
      handle: "janedoe",
      avatar: "https://api.dicebear.com/6.x/initials/svg?seed=JDe",
    },
    content: "This is a sample reply. #Fluxback",
    timestamp: new Date().toISOString(),
    parentId: 1,
    replyCount: 0,
    boostCount: 0,
    viewCount: 0,
    userReaction: {
      boosted: false,
      replied: false,
    }
  },
  {
    id: 202,
    author: {
      displayName: "Bubba Gump",
      handle: "bubbagump",
      avatar: "https://api.dicebear.com/6.x/initials/svg?seed=BG",
    },
    content: "This is another sample reply. #Fluxback",
    timestamp: new Date().toISOString(),
    parentId: 2,
    replyCount: 0,
    boostCount: 200,
    viewCount: 0,
    userReaction: {
      boosted: true,
      replied: false,
    }
  },
  {
    id: 203,
    author: {
      displayName: "Bubba Bump",
      handle: "bubbabump",
      avatar: "https://api.dicebear.com/6.x/initials/svg?seed=BB",
    },
    content: "Bump it up!",
    timestamp: new Date().toISOString(),
    parentId: 2,
    replyCount: 0,
    boostCount: 200,
    viewCount: 0,
    userReaction: {
      boosted: true,
      replied: false,
    }
  },
]
