import projectData from '../data/project.json'
import contactData from '../data/contact.json'
import pickupData from '../data/pickup.json'
import awardData from '../data/award.json'

export const loadProjectData = () => {
  return projectData.projects
}

export const loadContactData = () => {
  return contactData.contacts
}

export const loadPickupData = () => {
  return pickupData.pickups
}

export const loadAwardData = () => {
  return {
    data: awardData.awards,
    length: awardData.awards.length
  }
} 