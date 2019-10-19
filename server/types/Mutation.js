const { idArg, mutationType, stringArg } = require('nexus');
const { UserInputError } = require('apollo-server');
const { hash, compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const keys = require('@server/config/keys');

const Mutation = mutationType({
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        displayName: stringArg({ nullable: true }),
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (parent, { displayName, email, password }, context) => {
        const hashedPassword = await hash(password, 10);
        const user = await context.db.users.create({
          data: {
            displayName,
            email,
            password: hashedPassword,
          },
        });
        const token = sign({ userId: user.id }, keys.auth.jwtSecret);
        context.response.cookie('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365,
        });

        return user;
      },
    });

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (parent, { email, password }, context) => {
        // 1. Check if there is a user with that email
        const user = await context.db.users.findOne({
          where: {
            email,
          },
        });
        if (!user) {
          throw new UserInputError(`No user found for email: ${email}`);
        }
        // 2. Check if their password is correct
        const passwordValid = await compare(password, user.password);
        if (!passwordValid) {
          throw new UserInputError('Invalid password');
        }
        // 3. Generate the JWT Token
        const token = sign({ userId: user.id }, keys.auth.jwtSecret);
        // 4. Set the cookie with the token
        context.response.cookie('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365,
        });
        // 5. Return the user
        return user;
      },
    });

    t.field('createCourse', {
      type: 'Course',
      args: {
        title: stringArg(),
        description: stringArg({ nullable: true }),
      },
      resolve: (parent, { title, description }, context) => {
        const { userId } = context.user;
        return context.db.courses.create({
          data: {
            title,
            description,
            published: false,
            author: { connect: { id: userId } },
          },
        });
      },
    });

    t.field('deleteCourse', {
      type: 'Course',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, context) => {
        return context.db.posts.delete({
          where: {
            id,
          },
        });
      },
    });

    t.field('publish', {
      type: 'Course',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, context) => {
        return context.db.courses.update({
          where: { id },
          data: { published: true },
        });
      },
    });
  },
});

module.exports = {
  Mutation,
};