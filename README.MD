
## HY / Fullstack MOOC / Bloglist backend v2

### Luonti  

backend srv luotu - npm init  
repo - git init  

### Käynnistys  
Backendin käynnistys kehitysmoodissa  
npm run dev >> localhost:3003  
 

### Edistyminen

4.1 blogilista, step1  - git branch part4-01  
Luoto projekti - npm init  
Asennettu  
- npm install eslint --save-dev // Formaatti ja koodi tarkastus 
- npm install express --save  // Express kirjasto Nodelle
- npm install --save-dev nodemon  // Tarkkailee koodihakemisto ja srv uudelleen käynnistys
- npm install cors --save // Moduli CORS sallimiseksi 
- npm install mongoose --save  // Kirjasto MongoDB'lle  
- npm install dotenv --save // Moduli joka lataa .env tiedoston  
- npm install --save time-stamp // Moduli aikaleiman formatointiin   
- npm install morgan // Moduli tekemään lokitusta http-pyynnöistä   

Luotu /models hakemisto ja lisätty blog.js MongoDB'tä varten.  
Luotu /test-request hakemisto REST testitapauksia varten.  

4.2 blogilista, step2  
Ohjelman jakaminen  
/utils/logger.js  // keskitetty lokitus  




