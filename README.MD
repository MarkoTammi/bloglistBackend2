
## HY / Fullstack MOOC / Bloglist backend v2

### Luonti  

backend srv luotu - npm init  
repo - git init  

### Käynnistys  
Backendin käynnistys kehitysmoodissa  
npm run dev >> localhost:3003  

Backendin käynnistys testausmoodissa 
npm run test  

Yksittäisen testin ajo esim.
npm test -- tests/blog_api.test.js  


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

Luotu /models/blog.js >> db-schema    
Luotu /test-request/ >> REST testitapauksia varten.  

4.2 blogilista, step2  - git branch part4-02  
Ohjelman jakaminen pienempiin moduleihin  
/utils/logger.js  // keskitetty lokitus  
/controllers/blogs.js // API polut ja router  
/utils/middleware.js  // http request logger, unknownEndpoint  

Refaktoroitu koodi ja testattu toimivaksi  

4.3: apufunktioita ja yksikkötestejä, step1  - git branch part4-03  
Asennettu Jets testikirjasto  
npm install --save-dev jest  
Luotu /tests -hakemisto ja ensimmäisiä testejä  
Suoritus kommennolla "npm test"  

4.4: apufunktioita ja yksikkötestejä, step2  - git branch part4-04   
Luotu totalLikes testi  

4.8: blogilistan testit, step 1  
Asennettu cross-env kirjasto  
npm install cross-env  
Asennettu supertest kirjasto  
npm install --save-dev supertest  
Asennettu express-async-errors kirjasto  
npm install express-async-errors --save   
Poistettu .catch rakenteet  

4.10 - 12 : blogilistan testit, step3 - 5  
Lisätty API testejä ja parannettu APIn virheenkäsittelyä  

4.13 blogilistan laajennus, step1  
Blogin poisto ja testi  

4.14* blogilistan laajennus, step2  
Blogin päivitys ja testi >> TO DO  

















