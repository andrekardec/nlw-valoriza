import { getCustomRepository } from "typeorm"
import { ComplimentsRepository } from "../repositories/ComplimentsRepository"
import { TagsRepository } from "../repositories/TagsRepository"
import { UsersRepository } from "../repositories/UsersRepository"


interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string
}

class CreateComplimentService {
  async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {

    const complimentsRepository = getCustomRepository(ComplimentsRepository)
    const usersRepository = getCustomRepository(UsersRepository)
    const tagsRepository = getCustomRepository(TagsRepository)

    if (user_sender === user_receiver)
      throw new Error("You can not send a compliment to yourself.");

    const tagExists = await tagsRepository.findOne(tag_id)
    if (!tagExists)
      throw new Error("Tag does not exist.")

    const userReceiverExists = await usersRepository.findOne(user_receiver)
    if (!userReceiverExists)
      throw new Error("User receiver does not exist.");

    const compliment = complimentsRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message
    })

    await complimentsRepository.save(compliment);

    return compliment;

  }
}

export { CreateComplimentService }