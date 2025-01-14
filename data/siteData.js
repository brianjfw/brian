export const defaultProjectData = [{
  id: 'default',
  pickup: {
    pickupFlag: true,
    title: [{ text00: 'Welcome' }],
    text: [{ text00: 'This is a placeholder project' }]
  },
  siteColor: {
    allTextColor: '#000000',
    bodyContentsColor: '#ffffff',
    mvTextColor: '#000000'
  },
  title: {
    full: 'Welcome Project',
    short: 'Welcome'
  },
  client: 'Default Client',
  freeArea: '',
  contentsImg: [],
  detailsMainTextPc: { text00: 'Welcome' },
  detailsMainDescPc: { text00: 'This is a placeholder project' },
  detailsMainTextSp: { text00: 'Welcome' },
  heroImg: {
    pc: {
      url: '/images/default-hero.jpg',
      width: 1920,
      height: 1080
    },
    sp: {
      url: '/images/default-hero-sp.jpg',
      width: 750,
      height: 1334
    }
  },
  hambergerMenuImg: {
    url: '/images/default-menu-thumb.jpg',
    width: 180,
    height: 180
  },
  desc: 'This is a placeholder project description'
}]

export const defaultContactData = [{
  id: 'default-contact-1',
  mainTitle: {
    title: 'Contact',
    link: '#',
    subtitle: ''
  },
  list01: {
    link: '#',
    text: 'Email'
  },
  list02: {
    link: '#',
    text: 'Twitter'
  },
  list03: {
    link: '#',
    text: 'Instagram'
  }
}, {
  id: 'default-contact-2',
  mainTitle: {
    title: 'Social',
    link: '#',
    subtitle: ''
  },
  list01: {
    link: '#',
    text: 'GitHub'
  },
  list02: {
    link: '#',
    text: 'LinkedIn'
  },
  list03: {
    link: '#',
    text: 'Portfolio'
  }
}]

export const defaultPickupData = [{
  id: 'default-pickup',
  pickup: {
    pickupFlag: true,
    title: [{ text00: 'Featured Project' }],
    text: [{ text00: 'Check out our latest work' }],
    color01: '#000000',
    color02: '#ffffff'
  },
  siteColor: {
    allTextColor: '#000000',
    bodyContentsColor: '#ffffff',
    mvTextColor: '#000000'
  },
  title: {
    full: 'Featured Project'
  },
  heroImg: {
    pc: {
      url: '/images/default-pickup.jpg',
      width: 1920,
      height: 1080
    },
    sp: {
      url: '/images/default-pickup-sp.jpg',
      width: 750,
      height: 1334
    }
  }
}]

export const defaultAwardData = [{
  id: 'default-award',
  group: 'AWWWARDS',
  name: 'Example Award',
  description: 'Placeholder award description'
}]

export const defaultAwardDataLength = {
  awwwwardsLength: 1,
  cssdesignawardsLength: 0,
  csswinnerLength: 0
} 