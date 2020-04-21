
## HY / Fullstack MOOC / Bloglist backend v2

### Toiminnallisuus  

Blogi backend sovellus, joka on toteutettu Node.js.  
Blogien lisäys vaatii kirjautumisen.  

/controllers -hakemisto API rajapinta kutsuille  
/models -hakemisto blog ja user MongoDB dataschemoille  
/test-request -hakemisto REST API testeille VS Code REST client    
/test -hakemisto JETS ja SUPERTEST -kirjaston testeille  
/utils -hakemistossa middlewaret ja muita yhteistä koodia  

Tyylistä pitää huolen eslint.  

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

4.14* blogilistan laajennus, step2  - git branch part4-14  
Blogin päivitys ja testi  

4.15: blogilistan laajennus, step4  
Käyttäjähallinta  
- yksittäisen käyttäjän lisäys (post)  
- kaikkien käyttäjien tiedot (get)  
Asennettu salasanojen hashaamisen bcrypt -kirjasto
npm install bcrypt --save   
REST testejä    

4.16*: blogilistan laajennus, step5
Tarkistuksia käyttjän lisäykseen  
Asennettu Mongo kenttien tarkistamiseen mongoose-unigue-validator  
npm install --save mongoose-unique-validator  
REST testejä  

4.17: blogilistan laajennus, step6  
Laajentaa mitä tietoja tallennetaan ja näytetään sekä blog että user olioista.  
REST testejä  

4.18: blogilistan laajennus, step7  - git branch part4-18  
Token -perustainen kirjautuminen  
Asennettu jsonwebtoken -kirjasto  
npm install jsonwebtoken --save  
Luotu /controller/login.js  
REST testi login.rest  

Poistettu /tests -hakemiston harjoitustestit  

4.19: blogilistan laajennus, step8  - git branch part4-19  
Blogin lisäys jos HTTP POST -pyynnössä on valid token  
REST testit  

4.20*: blogilistan laajennus, step9  - git branch part4-20  
Refaktorointi tokenin erottaminen middlewareksi, joka ottaa  
tokenin Authorization-headerista ja sijoittaa sen request-olion  
token -kenttään.  

4.21*: blogilistan laajennus, step10  
Lisätty blogin poistavaa operaatiota siten, että poisto onnistuu  
ainoastaan jos poisto-operaation tekijä on sama kuin blogin lisääjä.  

4.22*: blogilistan laajennus, step11 - git branch part4-22  
Muokattu testejä huomioimaan login.  

4-kappale päättyy tähän.  























