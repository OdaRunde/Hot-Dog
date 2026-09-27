# Pull Requests
* `format`: issue-{number}
* `Example`: issue-42

> You should only merge with dev unless we're completing a milestone. The only exception is you're pushing a docs only commit - that can be pushed to main.

# Commit Message Standards

All commits must follow these formatting requirements:

## 1. Structure
Messages should follow the pattern: `<type>: <description>`

**Types:**
* `feat`: A new feature
* `fix`: A bug fix
* `docs`: Documentation only changes
* `style`: Changes that do not affect the meaning of the code
* `refactor`: A code change that neither fixes a bug nor adds a feature

## 2. Formatting
* **Title Length:** Limit the subject line to **50 characters** or less.
* **Body Wrapping:** Wrap the body at **72 characters**.
* **Separation:** Use a blank line between the title and the body.
* **Punctuation:** Do not end the subject line with a period.


## Example
feat: implement user authentication logic

- added password hashing with bcrypt
- integrated JWT token generation
- updated login endpoint to handle error states
