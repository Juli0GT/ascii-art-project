# Ascii Art Backend

## Run things
This assumes that you have `node` already installed, and an API tool like Postman or such. If you don't, go and install those.

1. First, as always do:
`npm i`

2. Copy & paste the `.env.example` file and rename it to `.env`. There's no need to change anything, but feel free to make any desire changes to it.

This will be your local configuration file and shouldn't be committed to the repository. (there's already a rule in the .gitignore, but just in case).

3. Do `npm run dev` to start the server. You can access the docs at http://localhost:8080/docs (or other port if you have changed it)

5. You can also use Postman (or something alike) to debug the app. (you can use `npm run api` to copy the definitions of the api in a json and import as a collection in postman)
