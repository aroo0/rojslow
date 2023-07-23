import { fakerPL as faker } from '@faker-js/faker';


export const randomUsername = () => {
    const randomAdjective = faker.word.adjective()
    const randomAnimalName = faker.animal.type();
    const randomNumber = faker.string.numeric(5)
    
    return `${randomAdjective}_${randomAnimalName}${randomNumber}`
}