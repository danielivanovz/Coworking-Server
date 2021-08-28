import bcrypt from 'bcryptjs'
import { Request } from 'express'
import { mongo } from '../db/db'
import { User } from '../models'

export const passwordCompare = async (input: string, password: string): Promise<boolean> => {
	return await bcrypt.compare(input, password)
}

export const userExistsAndPasswordIsTrue = async (req: Request) => {
	const { username, password } = req.body as Pick<User, 'username' | 'password'>
	const response = (await mongo.findOneUser({ username: username }, req.body)) as unknown as User
	return response && (await passwordCompare(password, response.password))
}

export const passwordHasher = async (req: Request): Promise<User> => {
	const { password }: Pick<User, 'password'> = req.body
	req.body.password = await bcrypt.hash(password as keyof User, await bcrypt.genSalt(10))
	return req.body as User
}
