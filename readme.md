## Table of Content
1. [What is Production](#what-is-production)
1. [How to Deploy](#how-to-deploy)
    * [Backend with Heroku](#backend-with-heroku)
    * [Frontend with Firebase](#frontend-with-firebase)

## Persyaratan Dasar
- Mengerti dasar-dasar terminal
- Sudah menginstall nodejs
- Sudah menginstall package nodejs `parcel-bundler` secara global, bisa dilihat pada tautan 
  [ini](https://parceljs.org/getting_started.html) 
  
## What is Production
Ketika ketika mengembangkan aplikasi kita, pasti harapannya aplikasi tersebut akan dilihat oleh  
orang lain bukan?  

Nah kondisi ketika aplikasi yang kita kembangkan siap untuk diliat oleh orang lain, adalah ketika  
kondisi aplikasi masuk ke tahap *production* atau siap diproduksi. Ketika sudah masuk ke tahap  
*production* artinya suatu aplikasi akan siap untuk di release atau disebut siap untuk di-*deploy*.

Pada pembelajaran kali ini kita akan mencoba untuk men-*deploy* suatu aplikasi yang *ceritanya*  
sudah masuk tahap *production*. Biar kita tidak berhenti hanya di tahap *development* saja ^_^

## How to Deploy
Pada pembelajaran ini, kita akan mencoba untuk men-*deploy* sebuah aplikasi sederhana, yang  
terpisah antara frontend dan backend-nya. Untuk aplikasi frontend-nya dibuat dengan vuejs dan  
untuk backendnya dibuat dengan expressjs + postgresql sebagai databasenya.

Untuk deployment ini kita tidak akan terlalu repot dan tidak mengeluarkan uang *sepeserpun* yah   
karena kita akan developer yang *cerdik* ~~dan pelit~~

### Backend with Heroku
Pertama-tama kita akan mencoba untuk mendeploy backendnya terlebih dahulu. Untuk kode dari   
backend ini bisa dilihat pada tautan 
[ini](https://github.com/withered-flowers/education-deploy-apps/tree/master/src/backend)

Ada banyak sekali tempat atau *cloud provider* yang menyediakan hosting aplikasi backend seperti  
AWS, GCP, Glitch, dkk. Namun yang akan kita gunakan pada pembelajaran ini adalah dengan   
menggunakan Heroku karena:
1. Gratis
1. Gratis
1. Gratis
1. Mendukung database postgresql

Tanpa perlu berlama-lama mari kita mencoba deploy aplikasi backend ini dengan Heroku.

PS1:
Untuk pembelajaran kali ini kita akan menggunakan heroku deployment sepenuhnya via CLI yah !  
Supaya bisa merasakan sensasi menjadi orang *Ops*

PS2:
Seluruh langkah yang ada di sini, ada pada dokumentasi Heroku, hanya saja disadur dengan bahasa  
yang lebih sedikit *manusiawi* yah.

#### Langkah 1 - Install Heroku CLI
Pertama-tama kita akan menginstall heroku-cli terlebih dahulu, dengan asumsi bahwa pada   
pembelajaran ini kita sudah mengenal nodejs, maka cara temudah untuk menginstall heroku-cli   
adalah dengan menggunakan `npm` itu sendiri, package heroku-cli adalah dengan:

```shell
npm install -g heroku
```

atau (untuk pengguna yarn) 

```shell
yarn global add heroku
```

Sebenarnya ada cara cara lain untuk menginstall heroku-cli ini, untuk lebih detilnya bisa membaca  
di tautan [heroku-cli how-to](https://devcenter.heroku.com/articles/heroku-cli) yah.

Kemudian setelah menginstall heroku-cli ini, kita bisa mengecek apakah heroku-cli ini sudah  
terpasang dengan mengecek version yang terpasang dengan perintah:

```shell
heroku --version
```

Dan akan muncul output yang kira kira seperti ini  
(output bisa berbeda tergantung versi dan os yang digunakan)

```shell
heroku/7.53.1 darwin-x64 node-v14.16.1
```

#### Langkah 2 - Login heroku
Langkah selanjutnya adalah kita akan login ke heroku dengan menggunakan perintah

```shell
heroku login
```

Kemudian tekan tombol apapun untuk membuka browser dan melakukan login (atau, apabila belum   
memiliki account, pilih *sign up*)

Kita juga bisa menambahkan options `-i` pada saat melakukan login (e.g. `heroku login -i`)   
apabila kita sudah memiliki akun heroku sehingga tidak perlu membuka browser dan semuanya bisa  
dari terminal saja.

Pastikan sampai di tahap ini kita sudah selesai logged in seperti informasi berikut:

```shell
Logging in... done
Logged in as xxxxxx@xxx.com
```

#### Langkah 3 - Create the Apps
Langkah selanjtunya adalah kita akan membuat nama dari aplikasi yang akan kita deploy ke heroku
dengan perintah:

```shell
heroku create 
```

PS:
Apabila mendeploy dengan cara ini, kita akan mendapatkan nama dari aplikasinya secara acak sesuai  
penamaan ala heroku, mis: `floating-dragon-42`.

Apabila ingin mengcustom nama yang digunakan, bisa juga dengan perintah:

```shell
heroku create NAMA_APLIKASI_YANG_DIINGINKAN
```

misalnya:

```shell
heroku create learning-deploy-backend
```

dan akan mendapatkan output sebagai berikut:

```shell
Creating ⬢ learning-deploy-backend... done
https://learning-deploy-backend.herokuapp.com/ | https://git.heroku.com/learning-deploy-backend.git
```

#### Langkah 4 - Menambahkan atau menyediakan database
Tergantung dari provider yang digunakan, maka untuk ketersediaan database caranya akan berbeda  
untuk cara instalasi dan penggunaannya. Pada heroku sendiri, penggunaan database postgres juga  
*kebetulan* disediakan secara *gratis*, namun kita perlu mengaktifkannya dengan menggunakan 
perintah:

```shell
heroku addons:create heroku-postgresql:hobby-dev --app NAMA_APLIKASI_YANG_DIINGINKAN
```

Dengan catatan NAMA_APLIKASI_YANG_DIINGINGKAN adalah sama dengan yang dibuat di langkah  
sebelumnya.

```shell
heroku addons:create heroku-postgresql:hobby-dev --app learning-deploy-backend
```

(sesuaikan dengan nama aplikasi yang dibuat sendiri yah)

PS:
`hobby-dev` adalah nama product postgres pada heroku yang *gratis*.

Output dari perintah ini kira kira adalah sebagai berikut:

```shell
Creating heroku-postgresql:hobby-dev on ⬢ learning-deploy-backend... free
Database has been created and is available
 ! This database is empty. If upgrading, you can transfer
 ! data from another database with pg:copy
Created postgresql-xxxx-xxxxx as DATABASE_URL
```

#### Langkah 5 - Modifikasi Kode untuk Deployment
Pada saat melakukan deployment, tentunya ada beberapa konfigurasi khusus yang harus kita lakukan  
yang berbeda dari tahap development, seperti:
- Konfigurasi Environment Variabel
- Konfigurasi credential database yang digunakan
- Memodifikasi kode supaya bisa dideploy dengan baik
- dst.

Pada langkah ini kita akan memodifikasi kode yang digunakan untuk tahap production agar siap   
untuk dideploy tanpa masalah !

##### Konfigurasi Environment Variabel
Pada saat tahap development tentunya kita menggunakan file dotenv (.env) sebagai penyimpan data  
sensitif kita bukan? namun pada tahap production, kita tidak akan menggunakan hal tersebut lagi.

Sebagai gantinya kita akan mengkonfigurasi environment variabel tersebut secara langsung pada   
server yang dimiliki. Untungnya pada heroku hal tersebut kita tidak perlu melakukannya karena  
kita dapat mengkonfigurasi environment variabel via cli.

Perintah yang digunakan untuk melihat environment variabel yang sudah ada pada aplikasi yang sudah  
dibuat adalah dengan menggunakan perintah:

```shell
heroku config --app NAMA_APLIKASI
```

output dari perintah ini adalah sebagai berikut:

```shell
== NAMA_APLIKASI Config Vars
DATABASE_URL: postgres://xxxxxx:xxxxxxxx
```

Ternyata pada aplikasi ini sudah memiliki sebuah environment variabel dengan nama `DATABASE_URL`.  

Ini terjadi ketika kita menambahkan postgresql pada heroku dan ini berisi credential dari   
postgres yang akan digunakan pada aplikasi kita nantinya.

Untuk menambahkan environment variabel bisa dengan menggunakan

```shell
heroku config:set KEY1=VALUE1 KEY2=VALUE2 --app NAMA_APLIKASI
```

Contoh misalnya kita ingin menambahkan SECRET pada environment variabel yang ada

```shell
heroku config:set SECRET=inisangatamansekali --app learning-deploy-backend
```

Dan kita akan mendapatkan output

```shell
Setting SECRET and restarting ⬢ learning-deploy-backend... done, v5
SECRET: inisangatamansekali
```

Setelah selesai menambahkan seluruh environment variabel selanjutnya kita akan memodifikasi kode  
yang dimiliki supaya dapat digunakan pada production

##### Modifikasi Kode
Pada bagian ini kita akan memodifikasi 2 bagian kode yang digunakan dalam aplikasi nodejs.  
Ceritanya aplikasi nodejs ini dibuat dengan menggunakan expressjs + sequelize, sehingga dalam
tahap production, ada beberapa kode yang harus dimodifikasi, khususnya pada file `app.js` dan   
`config/config.json`

Pada file `app.js`, kita harus memodifikasi port yang akan digunakan, umumnya memang pada tahap  
development, express akan menggunakan port 3000, namun pada saat dideploy, aplikasi ini tentunya  
akan menggunakan port yang disediakan oleh provider masing masing. umumnya provider akan   
menggunakan sebuah environment variabel tambahan dengan nama `PORT`, sehingga pada aplikasi   
express ini kita harus memodifikasinya supaya bisa menerima environment variabel port.

Modifikasi pada `app.js` bisa dilihat pada snippet kode di bawah ini:

```javascript
// File: app.js
...

// ubah port sehingga bisa menerima environment variabel dengan nama PORT
// apabila tidak ditemukan, kembali diset ke port 3000
const port = process.env.PORT || 3000;

...
```

Selain itu, pada sequelize, umumnya pada tahap development, yang akan digunakan pada file   
`config.json` nya adalah konfigurasi tahap development, namun pada saat deployment, yang akan   
digunakan adalah konfigurasi tahap production. 

Kebetulan, karena kita menggunakan heroku, postgres ini untuk credentialnya sudah menggunakan  
environment variabel dengan nama `DATABASE_URL` sehingga kita harus mengkonfigurasinya sebagai   
berikut:

```json
File: config/config.json

{
  "production": {
    "use_env_variable": "DATABASE_URL",
    "ssl": true,
    "dialect": "postgres",
    "protocol": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
}
```

PS:
untuk modifikasi json di atas, juga sudah menambahkan options tambahan yang harus digunakan  
agar deployment pada heroku dapat berjalan dengan baik.

Sampai di tahap ini artinya kita sudah memodifikasi kode expressjs dan konfigurasi sequelize,
selanjutnya kita akan memodifikasi run script agar dapat berjalan pada deployment.

##### Menambahkan script run
Pada saat melakukan deployment pada aplikasi berbasis nodejs, tentunya kita harus memiliki sebuah  
"penjalan" aplikasi, nah "penjalan" aplikasi ini adalah berupa script yang akan dipanggil ketika  
aplikasi ini akan dijalankan. script ini dapat dilihat pada file `package.json`. Sekarang kita  
akan memodifikasi file `package.json` supaya bisa memiliki script untuk menjalankan aplikasi.

Hasil modifikasi file `package.json` dapat dilihat sebagai berikut:

```json
File: package.json
...
  "scripts": {
    "dev": "NODE_ENV=development npx nodemon app.js",
    "start": "node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
...
```

Pada json di atas, kita menambahkan sebuah script dengan nama `start` yang akan menjalankan   
perintah `node app.js`.

Sampai di tahap ini kita sudah berhasil menambahkan `run script` untuk aplikasi kita, selanjutnya  
langkah terakhir, dimana kita menambahkan file khusus untuk provider aplikasi nodejs kita !

##### Menambahkan file khusus cloud provider
Pada Heroku, supaya dapat berjalan dengan baik, kita akan diminta untuk membuat sebuah file   
dengan nama `Procfile` (perhatikan huruf besar di awal yah !) yang akan digunakan untuk   
menjalankan `run script` yang dibuat di atas.

Buatlah sebuah file baru dengan nama `Procfile` yang akan berisi tulisan sebagai berikut:

```javascript
web: npm start
```

Sampai pada tahap ini modifikasi kode sudah selesai !

Selanjutnya kita akan mendeploy aplikasi backend yang sudah kita buat ini yah !

#### Langkah 6 - Deploy the Apps
Supaya dapat mendeploy aplikasi kita ke heroku, pertama tama kita harus menggunakan git repo  
yang disediakan oleh heroku terlebih dahulu. Sebelum itu, kita harus pindah ke directory / folder   
dimana folder aplikasi kita berada, kemudian kita akan mengetikkan suatu perintah.

Hal ini dapat kita lakukan dengan perintah:

```shell
heroku git:remote --app NAMA_APLIKASI
```

sehingga pada contoh ini perintah yang akan digunakan adalah:
```shell
heroku git:remote --app learning-deploy-backend
```

Selanjutnya kita akan melakukan commit dan push ke git seperti kita melakukannya ke git pada  
normalnya, hanya saja pada saat push, kita akan push ke remote `heroku`

```shell
git add .
git commit -m "message here"

# Lihat di sini kita akan push ke remote dengan nama heroku branch master yang ada di local

# git push <remote> <local_branch>:<remote_branch>
# bila local branch dan remote branch sama
# bisa diabaikan

# contoh di bawah ini adalah
# push ke remote "heroku", 
# dengan local branch DAN remote branch bernama "master"
# Disesuaikan dengan branch yang dimiliki yah !
git push heroku master
```

Tunggu sebentar kemudian diinfokan bahwa deployment sudah selesai dan sudah siap digunakan  
aplikasi kita !

Kita sudah bisa membuka aplikasi yang dideploy pada alamat https://namaaplikasi.herokuapp.com loh !

Tapi apakah benar demikian? tentunya saja ......... *tydaque* yah.

Hal ini terjadi karena kita belum melakukan inisialisasi terhadap database postgres yang  
digunakan.

#### Langkah 7 - Inisialisasi Tabel Database
Ketika kita membuka aplikasi yang dideploy pada alamat yang sudah diberikan oleh heroku,   
berdasarkan kode yang ada, tentunya akan muncul error `SequelizeDatabaseError`, yang menyatakan  
bahwa ada kesalahan pada database yang kita gunakan.

Hal ini terjadi karena kita belum menginisialisasi database yang digunakan, atau database masih  
dalam bentuk *kosongan*.

Untuk itu kita harus menginisialisasi tabel yang ada pada database kita.

Pada komputer lokal, hal ini bisa kita lakukan langsung dengan cara membuka terminal,   
mengarahkan ke folder yang kita gunakan, kemudian menggunakan perintah `sequelize` untuk    
melakukan hal tersebut, tapi, bagaimanakah bila kita menggunakan heroku?

Pada heroku kita bisa menggunakan terminal pada server remote yang disediakan oleh heroku.  
Untuk bisa mengakses terminal tersebut kita bisa menggunakan perintah:

```shell
heroku run bash 
```

setelah menggunakan perintah ini, akan diberikan terminal bash yang dapat digunakan untuk   
menggunakan perintah `sequelize` dan nodejs pada heroku.

Selanjutnya kita akan meng-install kembali package yang diperlukan untuk menjalankan `sequelize`  
dengan perintah nodejs pada umumnya

```shell
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
``` 

Perhatikan pada perintah di atas ada beberapa perubahan perintah yang dituliskan:
1. Kita menuliskan perintah secara lengkap `sequelize-cli` bukan `sequelize`, karena npx yang  
   ada di server heroku tidak mengetahui alias `sequelize-cli` menjadi `sequelize`.
2. Kita tidak menuliskan perintah `npx sequelize-cli db:create` lagi, karena pada heroku,   
   postgres yang dibuat sudah memiliki nama database tersendiri, jadi kita tinggal menggunakannya  
   saja.

Apabila sudah selesai mengkonfigurasi dan menginisialisasi tabel yang digunakan, kita menggunakan  
perintah `exit` untuk kembali ke terminal pada komputer lokal kita.

Sampai pada titik ini selesai sudah tahapan deploy aplikasi backend kita pada heroku ! Hore !!!

Selanjutnya adalah tahapan untuk deploy aplikasi frontend kita pada Firebase.

### Frontend with Firebase
Sama seperti dengan backend, ada banyak cloud provider yang menyediakan fitur untuk mendeploy  
aplikasi web yang sudah kita buat secara gratis seperti Vercel, Surge, Netlify, dan Firebase.

Pada pembelajaran ini kita akan mendeploy aplikasi frontend kita dengan menggunakan Firebase,   
lebih tepatnya adalah `Firebase Hosting`.

Firebase sendiri adalah suatu produk Google yang berisi sekumpulan fitur yang dapat mempermudah  
developer dalam membuat aplikasi, seperti storage, database, authentication, dan hosting.

Langkah-langkah deploynya adalah sebagai berikut:

#### Langkah 1 - Instalasi Firebase CLI
Pertama-tama, sebelum melakukan deployment, kita akan menginstall firebase-cli terlebih dahulu.  
Lagi-lagi cara termudah untuk menginstall firebase-cli adalah dengan menggunakan `npm`, dengan  
menggunakan perintah:

```shell
npm install -g firebase-tools
```

atau (untuk pengguna yarn) 

```shell
yarn global add firebase-tools
```

Sebenarnya ada cara lainnya untuk instalasi tanpa membutuhkan `npm`, untuk melihat cara lain  
untuk instalasi Firebase CLI bisa dilihat pada tautan [ini](https://firebase.google.com/docs/cli).

Kemudian setelah menginstall firebase-cli ini, kita bisa mengecek apakah firebase-cli ini sudah  
terpasang dengan mengecek version yang terpasang dengan perintah:

```shell
firebase --version
```

Dan akan muncul output yang kira kira seperti ini  
(output bisa berbeda tergantung versi dan os yang digunakan)

```shell
9.11.0
```

#### Langkah 2 - Login Firebase
Langkah selanjutnya adalah kita akan login ke firebase dengan menggunakan perintah

```shell
firebase login
```

Kemudian akan terbuka browser dan diminta untuk melakukan login dengan menggunakan akun GMail.  
(Firebase tidak dapat menggunakan non-interactive / non-browser mode yah !)


Pastikan sampai di tahap ini kita sudah selesai logged in seperti informasi berikut:

```shell
Waiting for authentication...

✔  Success! Logged in as xxxx@xxxxx.com
```

#### Langkah 4 - Membuat Project dan Apps
Langkah selanjutnya adalah kita akan membuat project dan nama aplikasi yang akan dideploy pada  
firebase.

Supaya dapat melakukan hosting frontend kita pada firebase, kita akan diminta untuk membuat sebuah  
project sebagai unique identifier dari aplikasi frontend yang akan di-deploy.

Hal ini dapat dilakukan dengan menggunakan perintah:

```shell
firebase projects:create NAMA_PROJECT
```

dan tekan tombol enter untuk melanjutkan pada saat ditanyakan 
`What would you like to call your project?`

Output dari perintah ini adalah:
```shell
✔ Creating Google Cloud Platform project
✔ Adding Firebase resources to Google Cloud Platform project

🎉🎉🎉 Your Firebase project is ready! 🎉🎉🎉

Project information:
   - Project ID: xxxx
   - Project Name: xxxx

Firebase console is available at
https://console.firebase.google.com/project/xxxx/overview
```

#### Langkah 4 - Modifikasi Kode untuk Deployment
Sama seperti deployment backend pada heroku, untuk deployment frontend pada firebase, kita juga  
akan melakukan beberapa modifikasi kode supaya siap untuk dideploy.

Pada frontend ini sendiri kode yang diubah (apabila dibuat dengan cukup baik), adalah hanya  
memodifikasi base endpoint nya saja.

Sehingga pada kode frontend kita ini, cukup hanya dengan membuka file   
`frontend/src/main.js`

```javascript
// File: src/main.js

// TODO: Change baseEndpoint to the project on cloud provider
// Heroku = https://xxxx.herokuapp.com
Vue.prototype.$baseEndpoint = "http://localhost:10000";
```

dan pada kode ini kita akan mengganti baseEndpoint menjadi endpoint herokuapp yang sudah
di-deploy sebelumnya, yaitu `https://learning-deploy-backend.herokuapp.com`

sehingga kode frontend kita ini sekarang akan menjadi

```javascript
// File: src/main.js

// TODO: Change baseEndpoint to the project on cloud provider
// Heroku = https://xxxx.herokuapp.com
Vue.prototype.$baseEndpoint = "https://learning-deploy-backend.herokuapp.com";
```

Perhatikan pada alamat di atas, kita menggunakan HTTPS dan sudah tidak menggunakan port lagi.

#### Langkah 5 - Build the Apps
Dikarenakan kita menggunakan vuejs di dalam aplikasi frontend ini, maka kita perlu untuk mmembuat  
atau mem-`bundle` aplikasinya terlebih dahulu. 

Dalam pembelajaran kali ini, kita akan membundle aplikasi frontend kita dengan `parcel`.

(Apabila menggunakan bundler yang lain, e.g. webpack / vite, disesuaikan saja yah !)

Kita akan memodifikasi file `package.json` dan menambahkan perintah untuk mem-bundle aplikasi   
dalam mode production.

Modifikasi kode pada file package.json dapat dilihat di bawah ini

```json
File src/frontend/package.json

...
scripts: {
  "dev": ...,
  "test": ...,
  "build": "parcel build index.html -d www"
}
```

Dengan menambahkan perintah atau run script `build` tersebut, kita akan mem-bundle aplikasi  
frontend yang dibuat dan diletakkan pada folder `www` di dalam folder aplikasi frontend.

Kemudian kita akan menjalankan script `build` tersebut dengan cara:

```shell
npm run build
```

Output dari perintah di atas adalah sebagai berikut:

```shell
npm run build

frontend@1.0.0 build
parcel build index.html -d www

✨  Built in 5.12s.

www/main.0437f4f8.js.map     445.64 KB    529ms
www/main.0437f4f8.js         116.18 KB    3.36s
www/main.b7906b4d.css          3.84 KB    208ms
www/main.b7906b4d.css.map       1.8 KB     55ms
www/index.html                   453 B    130ms
```

Perhatikan bahwa pada langkah ini, akan terbentuk sebuah folder baru dengan nama `www` yang berisi  
file yang akan digunakan untuk deploy pada firebase.

#### Langkah 6 - Deploy the Apps
Langkah selanjutnya adalah kita akan men-deploy aplikasi frontend kita pada firebase.

Untuk inikita akan menginisialisasi konfigurasi firebase project dengan menggunakan perintah:

```shell
firebase init hosting
```

Kemudian akan diberikan panduan untuk memilih fitur fitur dan project mana yang akan digunakan:
```shell
=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add, 
but for now we'll just set up a default project.

? Please select an option: (Use arrow keys)
# pada pertanyaan ini, pilih project yang sudah ada
Use an existing project
# kemudian kita akan memilih nama Firebase project yang pada langkah awal dibuat
NAMA_PROJECT

=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

? What do you want to use as your public directory? (public) 
# Gunakan folder www yang tadi sudah dibuat
www

? Configure as a single-page app (rewrite all urls to /index.html)? (y/N) 
No

? Set up automatic builds and deploys with GitHub?
No

File www/index.html already exists. Overwrite? 
No
```

Secara otomatis akan dibuatkan dua buah file pada folder frontend kita, yaitu `.firebaserc`  
dan `firebase.json` yang akan digunakan oleh firebase cli dalam mendeploy aplikasi kita.

Selanjutnya kita akan mendeploy aplikasi ke firebase dengan perintah:

```
firebase deploy
```

Kemudian kita hanya butuh untuk menunggu hingga deploy selesai, dan akan diberikan informasi  
link hosting aplikasi frontend kita

```shell
=== Deploying to 'xxxxx'...

i  deploying hosting
i  hosting[xxxxx]: beginning deploy...
i  hosting[xxxxx]: found 8 files in www
✔  hosting[xxxxx]: file upload complete
i  hosting[xxxxx]: finalizing version...
✔  hosting[xxxxx]: version finalized
i  hosting[xxxxx]: releasing new version...
✔  hosting[xxxxx]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/xxxxx/overview
Hosting URL: https://xxxxx.web.app
```

Kemudian kita tinggal mencoba untuk membuka aplikasi yang sudah dihosting pada URL tersebut  
dan *voila* aplikasi sudah terdeploy !

Sampai pada tahap ini artinya kita sudah berhasil mendeploy aplikasi backend dan frontend  
yang ada pada tempat yang terpisah dan hampir semuanya menggunakan CLI saja !

Selamat !

## Referensi
- https://devcenter.heroku.com/articles/heroku-cli
- https://devcenter.heroku.com/articles/getting-started-with-nodejs
- https://elements.heroku.com/addons/heroku-postgresql
- https://firebase.google.com/docs/cli