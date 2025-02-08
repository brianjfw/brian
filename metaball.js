function Particle(config) {
  const isPc = config && typeof config.isPc !== 'undefined' ? config.isPc : false
  this.isPc = isPc

  // ... rest of Particle initialization
}

export default Particle 