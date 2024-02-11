# Nx-Nest-S3-RabbitMQ-Demo

## Server-side architecture in general

![nx-nest-s3-rabbit-demo](https://github.com/KuzinVadym/nx-nest-s3-rabbit-demo/assets/8728056/fba5a77c-0eaa-4be9-b23a-b0cc3277131d)

## Sequence Diagram for 2 major UseCases

![Screenshot 2024-02-11 at 04 00 48](https://github.com/KuzinVadym/nx-nest-s3-rabbit-demo/assets/8728056/74e96db7-a679-4993-ab62-470e4e7f5821)

## Potentially, an Entity Diagram for relational databases

![nx-nest-s3-rabbit-demo-db-diagram](https://github.com/KuzinVadym/nx-nest-s3-rabbit-demo/assets/8728056/81bff669-a535-4db6-ac83-eb8b8b09968b)

## Project Structure

### apps
- assets-data
- assets-manager
- gateway
    - api
### libs
- assets-data
    - api
    - client
- assets-manager
    - api
    - client
- gateway
    - api
        - assets
- shared
    - mongo-client
    - queue
    - s3-client

## Steps to play around

1. Jump inside of the repo
2. Just in case `nvm install` -> `npm install --global yarn`
3. Install dependencies `yarn install`
4. Build microservices:

   - `yarn nx build gateway-api`
   - `yarn nx build assets-manager`
   - `yarn nx build assets-data`
     
5. Check `.env.basic` file for missing environments variable (here you whould need AWS credentials for s3 bucket)
6. After you fill missing credentials -> create `.env` file and copy everything from `.env.basic` there

   - you can create and fill `.env` immediately without additional steps
   - if you follow first approach - don't forgot to remove you credentials from `.env.basic` just in case, who knows and let the force be with you.
7. Run `docker-compose up -d` (sorry for know without k8 Deployments)
8. To Create Asset send POST request to `http://localhost:3000/api/v1/assets` with next body
   ```
   {
     category": "The Force",
     "url": "https://static.posters.cz/image/750/poster/star-wars-yoda-may-the-force-be-with-you-i31846.jpg"
   }
   ```    
9. To Get Assets send GET request to `http://localhost:3000/api/v1/assets` without body

Troublesooting: 
    
- as "Get ready to Deploy :rocket:" process not fully automated for local development before building images with 
        `docker-compose build` you need to build js bundles, so if you working with one of the microservices and then want to `docker-compose up -d` you need 
        to run one of the comands from step 4 first, then `docker-compose build` -> `docker-compose up -d`. Sorry for inconveniences :sweat_smile:
  
- pay attention that containers mentioned in docker-compose.yml working with each other in `rabbitmq_mongo_nodejs` network 
        that's why in `.env` we have `ASETS_MANAGER_URL` and `DOCKER_COMPOSE_ASETS_MANAGER_URL`

- Put all needed credentials to `.env` file before you will run `docker-compose up -d`, if the image was builded without needed env you will need to step back to step 4
- If some really weird cases will occur - better call Saul.

