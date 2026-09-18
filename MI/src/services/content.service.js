import content from '../data/content.js'

export const getHero = () => Promise.resolve(content.hero)
export const getServices = () => Promise.resolve(content.services)
export const getProcess = () => Promise.resolve(content.process)
export const getCompare = () => Promise.resolve(content.compare)
export const getShowcase = () => Promise.resolve(content.showcase)
export const getContact = () => Promise.resolve(content.contact)
export const getSite = () => Promise.resolve(content.site)