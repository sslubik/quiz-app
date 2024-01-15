## Quiz-app
Backend application for managing quizzes created with NestJS and TypeORM.
Implements GraphQL API, contenerized PostgreSQL database and unit tests in Jest.

## Installation
Before you proceed with the installation, make sure you have `Docker` and `Docker Compose` installed on your computer. Follow the manual on the official website to install them on your OS:
https://docs.docker.com/desktop/

In addition, install git, npm and nest. 
For most Debian based Linux distributions simply copy the commands below to your terminal:
```bash
# git
sudo apt install git

# npm
sudo apt install npm

# nest
npm i nest
```
Now, navigate to a directory of your choice and clone this repository:
```bash
git clone https://github.com/sslubik/quiz-app
```

## Running the app
To run the app navigate to its root directory. Once you're there, you'll notice a `.env` file.
This file contains some environmental variables for PostgreSQL and the quiz-app. If you wish, can change them.

You can now launch docker-compose:
```bash
docker-compose up -d
```
`Note: if you encounter any errors, try running the command with "sudo". If it doesn't help, make sure you installed Docker and Docker Compose correctly.`

It is time to finally run the quiz-app! To do so, simply type in your terminal:
```bash
npm run start:dev
```
This command should successfully lanunch the quiz-app. If you notice any errors regarding database connection, shut down the app by pressing `ctrl + c` and then type:
```bash
docker-compose down
```
`Note: Once again, if it doesn't work try appending "sudo" to the command.`

Now we can see the quiz-app in action! Go to a browser of your choice. In the search bar type:
```
localhost:3000/graphql
```
You should be greeted with a GraphQL Playground. We'll use it to test our application.

This app is made for creating and solving various quizzes. We obviously need some individuals who'll have the ability create them and some who'll have the ability to solve them. Let's call them `teachers` and `students`.

Let's create a new teacher!

To do so we need to input a `mutation` that will update our database. `Mutations` modify data stored in database by creating new entries or modifying/deleting existing ones.
```
mutation {
  createUser(
    createUserDto: {
      username: "JDoe"
      email: "john.doe@gmail.com"
      password: "qwerty"
      full_name: "John Doe"
      user_role: TEACHER
    }
  ) {
    id
    username
  }
}
```
Copy this `mutation` to GraphQL and then press "Execute query" button (alternatively press `crtl + enter`).

You should see the `id` and `username` of the user as feedback from our app. `id` is created automatically by the database. Each user has unique `id`.

Now let's see all the users stored in our database. Create a new tab in GraphQL Playground and copy and paste this `query`:
```
{
  findAllUsers {
    id
    username
    email
    full_name
    user_role
  }
}
```
You should see only one user: the user you've just created. `Queries` are used to fetch data from the server. You can distinguish `queries` and `mutations` by their keyword before the input. `Queries` don't require typing the keyword explicitly.

Now that there's a `teacher` in our database already, let's create a `student`. Once again, open a new tab in GraphQL Playground and paste the given `mutation`:
```
mutation {
  createUser(createUserDto: {
    username: "SomeStudent"
    email: "random@mail.com"
    password: "1234"
    full_name: "Mark Feathers"
    user_role: STUDENT
  }) {
    id
    username
  }
}
```
To check if the new `student` was indeed saved, execute the `query` from the previous tab.

Ok, now that we have a teacher and a student, let's create a quiz. Paste the following mutation to GraphQL playground:
```
mutation {
  createQuiz(
    createQuizDto: {
      user_id: 1
      name: "Quiz nr. 1"
      questionsDto: [
        {
          content: "Choice question nr. 1"
          question_type: CHOICE
          max_points: 3.5
          choiceAnswersDto: [
            { content: "Choice answer nr. 1", is_correct: true }
            { content: "Choice answer nr. 2", is_correct: false }
            { content: "Choice answer nr. 3", is_correct: true }
          ]
        }
        {
          content: "Sorting question nr. 1"
          question_type: SORTING
          max_points: 5
          sortingAnswersDto: [
            { content: "Sorting answer nr. 1", order: 3 }
            { content: "Sorting answer nr. 2", order: 1 }
            { content: "Sorting answer nr. 3", order: 2 }
          ]
        }
        {
          content: "Text question nr. 1"
          question_type: TEXT
          max_points: 1
          textAnswersDto: [
            { content: "Text answer nr. 1" }
            { content: "Text answer nr. 2" }
          ]
        }
      ]
    }
  ) {
    id
    name
  }
}
```
The quiz must have a creator (`user_id`), and it must be a `teacher`. In this case, we used the `id` of the created `teacher` to make him the owner of this quiz.
We also passed 3 different `questions` of 3 different `question_types`:

- `CHOICE`: question with multiple answers to pick, and at least on of them must be correct
- `SORTING`: question with answers that should be sorted in correct order
- `TEXT`: question that requires `students` to pass a text answer

Execute the `mutation`.

Now that we created a quiz, we should assign it to certain individuals. To do so, let's create an attempt. 
Attempt is required to store data about, well, an attempt. It contains informations such as `opens_at` and `finished_at`, which store date types. 
It also contains informations about time limit and the assigned user (`user_id`), as well as the quiz it represents. 

Run the following `mutation`
```
mutation {
  createAttempt(crateAttemptDto: {
    user_id: 2
    quiz_id: 1
    opens_at: "2024/01/15"
    time_limit: "30 minutes"
  }) {
    id
  }
}
```

Let's imagine we are the unfortunate `student` that has to solve the quiz. We would like to get each question of the quiz and its corresponding answers.
Let's run the `query`:
```
{
  findAttemptById(ID: 1) {
		attempt_questions {
      question {
        id
        content
        answers {
          ... on ChoiceAnswer {
            id
            content
          }
          ... on SortingAnswer {
            id
            content
          }
        }
      }
    }
  }
}
```
Note: we don't fetch answers for `TEXT` question, because it's the user who has to come up with one of them!

Now that we know each question, let's pass our answers. To do so we need to run another `mutation`:
```
mutation {
  updateAttempt(updateAttemptDto: {
    attempt_id: 1
    userAnswers: [
      {
        question_id: 1
        num_array_answer: [1, 3]
      },
      {
        question_id: 2
        num_array_answer: [2, 3, 1]
      },
      {
        question_id: 3
      	text_answer: "text answer nr 1"  
      }
    ]
  }) {
    score
    max_points
  }
}
```
Notice that in `num_array_answer` for the `CHOICE` type question we pass the `id`s of answers user considers correct, but the same field in `SORTING` type question represents the order given by the user.

After we passed our answers we can see our score and max_points in quiz. Now, let's mess up a bit and change `text_answer: "text answer nr 1"` to `text_answer: "text answer nr 3"` and see the difference.

Now you can play with the quiz-app on your own! Try coming up with `mutations` and `queries` of your choice, you can also check the `DOCS` section in GraphQL Playground to see what other `queries` and `mutations` are provided!

## Tests
To run unit tests in this app, navigate to the root directory of the quiz-app and type in terminal:
```bash
npm test
```

Enjoy!
