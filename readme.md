## Table of Content
1. [What is Production](#what-is-production)
1. [How to Deploy](#how-to-deploy)
    * [Database with Supabase](#database-with-supabase)
    * [Backend with Railway](#backend-with-railway)
    * [Frontend with Firebase](#frontend-with-firebase)

## Persyaratan Dasar
- Mengerti dasar-dasar terminal
- Sudah menginstall nodejs
- Sudah menginstall package nodejs `parcel-bundler` secara global, bisa dilihat pada tautan [ini](https://parceljs.org/getting_started.html) 
  
## What is Production
Ketika ketika mengembangkan aplikasi kita, pasti harapannya aplikasi tersebut akan dilihat oleh orang lain bukan?  

Nah kondisi ketika aplikasi yang kita kembangkan siap untuk diliat oleh orang lain, adalah ketika kondisi aplikasi masuk ke tahap *production* atau siap diproduksi. Ketika sudah masuk ke tahap *production* artinya suatu aplikasi akan siap untuk di release atau disebut siap untuk di-*deploy*.

Pada pembelajaran kali ini kita akan mencoba untuk men-*deploy* suatu aplikasi yang *ceritanya* sudah masuk tahap *production*. Biar kita tidak berhenti hanya di tahap *development* saja ^_^

## How to Deploy
Pada pembelajaran ini, kita akan mencoba untuk men-*deploy* sebuah aplikasi sederhana, yang terpisah antara frontend, backend, dan (bahkan) databasenya. Untuk aplikasi frontend-nya dibuat dengan Vue (v3) dan untuk backendnya dibuat dengan expressjs + databasenya menggunakan PostgreSQL yang terpisah dari backendnya.

Untuk deployment ini kita tidak akan terlalu repot dan tidak mengeluarkan uang *sepeserpun* yah karena kita akan developer yang *cerdik* ~~dan pelit~~

### Database with Supabase

Untuk membuat sebuah aplikasi yang baik, umumnya kita harus memisahkan tempat tempat deployment yang kita miliki supaya "seakan-akan" kita mengikut trend yang kekinian: `microservices`.

Nah oleh sebab itu, sekarang ini kita pun akan mencoba untuk mendeploy aplikasi kita ke tiga tempat yang berbeda:
- Databasenya akan kita pisah sendiri
- Server Backendnya akan kita taruh di tempat yang lainnya
- Hosting Frontendnya pun akan kita taruh di tempat lainnya

(Sebenarnya ini alasan dasarnya adalah karena kita adalah .... developer yang pelit yang mau deploy aplikasi secara gratis tis tis tis tis !)

Berdasarkan `hype` di atas, mari kita coba untuk mendeploy aplikasi kita, dimulai dari kita mencoba untuk membuat databasenya terlebih dahulu yah !

Untuk bisa menaruh database kita di internet, maka kita akan menggunakan suatu servis yang disediakan oleh [Supabase](https://supabase.com/) yang memiliki (lagi lagi...) Free Tier yang cukup untuk menunjang kita dalam membuat aplikasi.

Langkah-langkah yang diperlukan untuk menaruh database kita ke supabase adalah seperti berikut:

#### Langkah 1 - Inisialisasi Project di Supabase
1. Membuka tautan [Supabase](https://supabase.com) dan lakukan registrasi (link dengan account github)
1. Membuat sebuah `Organization` yang baru di dalam supabase yang akan mengepalai project yang akan kita buat untuk menaruh database
1. Membuat sebuah `Project` yang baru di dalam supabase dan memasukkan `database password` yang diwajibkan (password diminta untuk kuat yah, jadi jangan masukkan password nya adalah `password` atau `bismillah` atau `aminaminamin` yah !)
1. Memilih **Region** menjadi `West US - North California` (supaya nanti dekat dengan Backend kita)
1. Untuk **Pricing Plan** tentu saja kita akan memilih yang `Free - 0$ / Month`
1. Kemudian tekan tombol `Create new project` dan menunggu dengan sabar.
1. Setelah selesai, kita akan diberikan halaman dashboard dari akun Supabase yang kita miliki dan di bawah lambang `petir hijau` akan ada banyak sekali icon. Pilih icon yang berupa `Gear` yang bertuliskan `Project Setting`
1. Pada halaman Project Setting, pilih navigasi dengan tulisan `Database` kemudian scroll ke bawah sampai ada tulisan `Connection String`
1. Pada Connection String, pilih yang berupa `URI` kemudian copy string yang diberikan oleh supabase ke dalam notepad terlebih dahulu, e.g.: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres`, jangan lupa untuk mengganti `[YOUR-PASSWORD]` dengan password yang baru saja diinput untuk password database.
1. Sampai pada tahap ini maka inisialisasi project di supabase kita sudah selesai !

#### Langkah 2 - Konfigurasi Sequelize untuk Production
1. Selanjutnya kita akan masuk ke ranah aplikasi kita
1. Membuka konfigurasi sequelize pada `/config/config.json` dan memodifikasi environment untuk `production`:
    ```json
    production: {
      "use_env_variable": "DATABASE_URL",
      "dialect": "postgres",
      "protocol": "postgres"
    }
    ```
1. Maksud dari konfigurasi di atas adalah, pada mode `production`, sequelize akan menggunakan environment variable bernama `DATABASE_URL` untuk melakukan koneksi ke database yang digunakan
1. Sampai pada titik ini artinya untuk konfigurasi sequelize sudah selesai, selanjutnya kita akan beralih untuk deploy aplikasi backend kita.
1. (Sampai di sini pada production database belum ada tabel apapun yah !)

### Backend with Railway
Pada bagian ini kita akan mencoba untuk mendeploy aplikasi backend pada [Railway](https://railway.app)

Pertama-tama kita akan mencoba untuk mendeploy backendnya terlebih dahulu. Untuk kode dari backend ini bisa dilihat pada tautan [ini](https://github.com/withered-flowers/education-deploy-apps/tree/master/src/backend-railway)

Sebenarnya ada banyak sekali tempat atau *cloud provider* yang menyediakan hosting aplikasi backend seperti AWS, GCP, Glitch, Heroku, dkk. Namun yang akan kita gunakan pada pembelajaran ini adalah dengan menggunakan Railway karena:
1. Gratis
1. Gratis
1. Gratis

Tanpa perlu berlama-lama mari kita mencoba deploy aplikasi backend ini dengan Railway.

PS1:  
Untuk pembelajaran kali ini kita akan menggunakan Railway deployment separuh CLI yah !

Supaya bisa merasakan sensasi menjadi orang *Ops*

PS2:  
Seluruh langkah yang ada di sini, ada pada dokumentasi Railway, hanya saja disadur dengan gaya *cheatsheet* yah

#### Langkah 1 - Instalasi Railway CLI
Pertama-tama kita akan menginstall railway-cli terlebih dahulu, dengan asumsi bahwa pada pembelajaran ini kita sudah mengenal nodejs, maka cara temudah untuk menginstall railway-cli adalah dengan menggunakan `npm` itu sendiri, package railway-cli adalah dengan:

```shell
npm i -g @railway/cli
```

Sebenarnya ada cara cara lain untuk menginstall railway-cli ini, untuk lebih detilnya bisa membaca di tautan [railway-cli how-to](https://docs.railway.app/develop/cli) yah.

Kemudian setelah menginstall railway-cli ini, kita bisa mengecek apakah railway-cli ini sudah terpasang dengan mengecek version yang terpasang dengan perintah:

```shell
railway --version
```

Dan akan muncul output yang kira kira seperti ini  
(output bisa berbeda tergantung versi yang digunakan)

```shell
railway version 2.0.13
```

#### Langkah 2 - Login Railway
Langkah selanjutnya adalah kita akan login ke railway dengan menggunakan perintah

```shell
railway login
```

Kemudian tekan tombol apapun untuk membuka browser dan melakukan login (baik via email ataupun github)

Kita juga bisa menambahkan options `--browserless` pada saat melakukan login (e.g. `railway login --browserless`) apabila kita ingin melakukan proses login pada device lainnya untuk cli yang kita miliki (e.g. login untuk terminal, tapi harus buka browser dari smartphone)

PS1:

Apabila menggunakan opsi `--browserless`, maka untuk email silahkan memasukkan email yang manapun untuk dikirimkan magic link supaya dapat melakukan login

PS2:

Kita hanya diberikan waktu yang sangat sebentar untuk bisa melakukan login (sekitar 5 menit), apabila melewati jendela waktu tersebut silahkan relogin lagi yah !

Apabila sudah selesai login, seharusnya akan ada output seperti berikut:

```shell
Your pairing code is: xxx-xxxxx-xxxx-xxxxx
To authenticate with Railway, please go to 
    https://railway.app/cli-login?d=abcdefghijklmnopqrstuvwxyz

🎉 Logged in as  (xxxx@xxxxxxx.com)
```

Setelah selesai melakukan login, jangan lupa untuk membuka halaman dashboard railway pada [https://railway.app/dashboard](https://railway.app/dashboard) Kemudian agree dengan Terms of Service (ToS) yang dimiliki oleh Railway.

(ToS ini harus diaccept via browser !)

Kemudian kita akan diminta untuk melakukan `Verifikasi Account` yang dapat dilakukan dengan 2 cara:
- Connect to Account Github, yang umurnya lebih dari 90 hari (bila menggunakan login dengan github, dan akun lebih dari 90 hari, skip bagian ini)
- Memasukkan Virtual Card Number / CC untuk melakukan verifikasi (Pastikan ada saldo minimal 1 USD)

Perbedaan Verified dan Non Verified Account adalah:
- Non Verified Account mendapat saldo 2 USD, hanya sekali saja (tidak direfresh per bulan)
- Verified Account mendapat saldo 5 USD, recurring (refresh per bulan)
- Non Verified Account tidak dapat mengupload kodenya untuk dideploy ke Railway, hanya bisa deploy starter pack saja !

#### Langkah 3 - Create Project & Service
Langkah selanjutnya adalah kita akan masuk ke dalam folder backend yang dimiliki dan membuat project yang akan kita deploy ke railway dengan perintah: 

```shell
cd folder-project-backend
railway init
```

Kemudian untuk konfigurasinya pilihnya sebagai berikut:

```
Starting Point: Empty Project
Enter project name: nama-project-yang-diinginkan
Environment: production

.env detected!
Import your variables into Railway? No
```

(Pada saat ini, import variable ke Railway tidak berguna karena Railway belum bisa mengimport environment variable tersebut ke dalam services)

Dan kemudian railway akan membukakan halaman dashboard ke project tersebut.

Pada halaman Dashboard Project tersebut, kita akan menambahkan sebuah `service` yang baru di dalam project Railway itu sendiri.

`service` dalam Railway adalah sebuah tujuan deployment dari aplikasi yang ingin di-serve. TL;DR anggap saja ini adalah nama aplikasi yang ingin dideploy.

Karena di sini kita akan mencoba untuk deploy dari CLI, maka kita akan:
1. Menekan Card yang bertuliskan `Add a service`
1. Memilih `Empty Service`
1. Setelah itu kita akan diberikan sebuah service baru dengan nama random, e.g. `utmost-increase`. 
1. Apabila ingin mengganti nama service itu, maka kita akan mengklik card yang ada nama random tersebut, kemudian memilih `Settings`, pada bagian `Service` jadi setting dengan nama `Service Name` kemudian ganti menjadi nama service yang diinginkan, kemudian tekan icon centang yang ada di sebelah kanan input tersebut.

Sampai pada tahap ini, artinya kita sudah berhasil untuk membuat sebuah Project dan sebuah Service

#### Langkah 4 - Modifikasi kode untuk deployment
Pada saat melakukan deployment, tentunya ada beberapa konfigurasi khusus yang harus kita lakukan yang berbeda dari tahap development, seperti:
- Konfigurasi Environment Variable
- Konfigurasi database (migration & seeding)
- Memodifikasi kode supaya bisa dideploy dengan baik
- dst.

Pada langkah ini kita akan memodifikasi kode yang digunakan untuk tahap production agar siap utuk dideploy tanpa masalah !

##### Konfigurasi Environment Variable
Pada saat tahap developent tentunya kita sangat umum menggunakan file dotenv (`.env`) sebagai tempat penyimpanan data sensitif kita bukan?

Namun pada tahap production, kita tidak akan menggunakan hal tersebut lagi.

Sebagai gantinya kita akan mengkonfigurasi environment variable tersebut secara langsung pada server yang dimiliki.

Sayangnya pada Railway, kita tidak dapat mengkonfigurasi pada server secara langsung, sehingga kita perlu mengkonfigurasi environment variable via cli ataupun GUI (browser).

Di dalam Railway ini sendiri, `environment variables` disimpan dalam sebuah `service` tertentu.

Karena tadi kita baru saja meng-set sebuah service yang kosongan, maka kita bisa meng-set environment variable dengan perintah:

```shell
railway variables set KEY1=VALUE1 KEY2=VALUE2
```

Untuk pembelajaran ini, kita sekarang akan memasukkan 2 variable sekaligus:
- `DATABASE_URL` = URI dari postgres yang ada di supabase
- `SECRET` = secret key yang digunakan dalam aplikasi backend.

Sehingga perintah yang digunakan adalah:

```shell
railway variables set DATABASE_URL=postgres://xxxxxx:xxxxxxxx SECRET=inisudahcukupamanlah
```

Dan kita akan mendapatkan output:

```shell
==> Updated DATABASE_URL, SECRET for "production"
DATABASE_URL: postgres://xxxxxx:xxxxxxxx
SECRET:       inisudahcukupamanlah
```

Setelah selesai menambahkan seluruh environment variable yang ada, selanjutnya kita akan melakukan modifikasi kode yang dimiliki supaya bisa digunakan di production.

PS:
- Apabila ingin meng-set environment variable untuk service yang lainnya, maka kita bisa menggunakan opsi `-s`, e.g.:

```shell
railway variables set -s NAMA_SERVICE KEY1=VALUE1 KEY2=VALUE2
```

##### Modifikasi Kode
Pada bagian ini kita akan memodifikasi 2 bagian kode yang digunakan dalam aplikasi nodejs.  

Ceritanya aplikasi nodejs ini dibuat dengan menggunakan expressjs + sequelize, sehingga dalam tahap production, ada beberapa kode yang harus dimodifikasi, khususnya pada file `app.js` dan `config/config.json`

Pada file `app.js`, kita harus memodifikasi port yang akan digunakan, umumnya memang pada tahap development, express akan menggunakan port 3000. 

Namun pada saat dideploy, aplikasi ini tentunya akan menggunakan port yang disediakan oleh provider masing masing. 

Umumnya provider akan menggunakan sebuah environment variabel tambahan dengan nama `PORT`, sehingga pada aplikasi express ini kita harus memodifikasinya supaya bisa menerima environment variabel port.

Modifikasi pada `app.js` bisa dilihat pada snippet kode di bawah ini:

```javascript
// File: app.js
...

// ubah port sehingga bisa menerima environment variabel dengan nama PORT
// apabila tidak ditemukan, kembali diset ke port 3000
const port = process.env.PORT || 3000;

...
```

Selain itu, pada sequelize, umumnya pada tahap development, yang akan digunakan pada file `config.json` nya adalah konfigurasi tahap development, namun pada saat deployment, yang akan digunakan adalah konfigurasi tahap production. 

Kebetulan, karena kita menggunakan environment variable bernama `DATABASE_URL`, maka sekarang kita harus mengkonfigurasinya sebagai berikut:

```json
File: config/config.json

{
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
    "protocol": "postgres",
  }
}
```

Sampai di tahap ini artinya kita sudah memodifikasi kode expressjs dan konfigurasi sequelize, selanjutnya kita akan menjalankan perintah untuk melakukan migrasi dan seeding pada production

##### Konfigurasi Database (Migration & Seeding on Production)
Umumnya bila kita menggunakan sequelize dan kita ingin melakukan migration sampai dengan seeding (pada development), kita akan menggunakan perintah sebagai berikut:

```shell
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Namun pada saat di production, ada beberapa penyesuaian yang harus dilakukan:
- Umumnya database sudah dibuat, sehingga kita tidak perlu menggunakan `db:create` lagi.
- Pada saat menjalankan kode production, umumnya kita harus menggunakan environment variable khusus production dan memilih environment node yang di-set ke `production`.

Sehingga perintah yang seharusnya dituliskan adalah:

```shell
npx sequelize-cli --env=production db:migrate
npx sequelize-cli --env=production db:seed:all
```

Namun apabila perintah ini kita jalankan langsung di terminal yang kita miliki, tentunya hal ini akan menyebabkan error, karena kita tidak memiliki environment variable yang dibutuhkan dari railway di dalam aplikasi yang kita buat.

Nah, bagaimanakah penyelesaiannya?

Untuk itu, kita akan meminta railway untuk menyediakan environment variable yang dimilikinya, dan menjalankan perintah yang ada di komputer lokal kita, dengan menggunakan perintah:

```shell
railway run perintah-yang-ingin-dijalankan
```

sehingga perintah yang dijalankan adalah:

```shell
railway run npx sequelize-cli --env=production db:migrate
railway run npx sequelize-cli --env=production db:seed:all
```

PS:  
- Pastikan ketika menggunakan perintah di atas, pada folder yang kita miliki di komputer lokal kita sudah ada `node_modules` nya yah !
- Bila belum ada, pastikan `npm install` terlebih dahulu package.json yang dibutuhkan di local !

Selanjutnya kita akan menambahkan sedikit script yang dibutuhkan untuk menjalankan aplikasi kita sebelum bisa melakukan deploy aplikasi.

##### Menambahkan script run
Pada saat melakukan deployment pada aplikasi berbasis nodejs, tentunya kita harus memiliki sebuah "penjalan" aplikasi, 

Nah "penjalan" aplikasi ini adalah berupa script yang akan dipanggil ketika aplikasi ini akan dijalankan. script ini dapat dilihat pada file `package.json`. 

Sekarang kita akan memodifikasi file `package.json` supaya bisa memiliki script untuk menjalankan aplikasi.

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

Pada json di atas, kita menambahkan sebuah script dengan nama `start` yang akan menjalankan perintah `node app.js`.

Sampai di tahap ini kita sudah berhasil menambahkan `run script` untuk aplikasi kita, selanjutnya langkah terakhir, kita akan melakukan deploy aplikasi kita.

#### Langkah 5 - Deploy the Apps
Selanjutnya kita akan mendeploy aplikasi yang sudah dibuat dengan database yang sudah dikonfigurasi ini.

Pada railway, untuk mendeploy aplikasi yang dibuat adalah dengan menggunakan perintah:

```shell
railway up
```

Dan kemudian akan diberikan output yang kira kira seperti berikut
```shell
☁️ Build logs available at https://railway.app/project/x-x-x-x/service/y-y-y-y

==============
Using Nixpacks
==============


╔═════════ Nixpacks v0.14.0 ════════╗
║ setup      │ nodejs-16_x, npm-8_x ║
║───────────────────────────────────║
║ install    │ npm ci               ║
║───────────────────────────────────║
║ start      │ npm run start        ║
╚═══════════════════════════════════╝


...

======= Build Completed ======

Waiting for deploy to finish
☁️ Deployment logs available at https://railway.app/project/x-x-x-x/service/y-y-y-y
OR run `railway logs` to tail them here

☁️ Deployment is live
```

Dan sampai di sini tahap pembuatan aplikasi kita pun baru akan dimulai.

Untuk mengecek apakah aplikasi kita sudah siap, maka kita bisa mengeceknya dengan menggunakan perintah

```shell
railway logs
```

Dan pastikan output paling bawahnya adalah sekiranya sebagai berikut:

```shell
npm WARN config production Use `--omit=dev` instead.
> nama-project@1.0.0 start
> node app.js
Application is working at port xxxx
```

Dan untuk keluar dari logs, bisa menggunakan `CTRL + C`

Selanjutnya kita akan kembali ke halaman dashboard supaya bisa mendapatkan domain (`alamat internet`) yang bisa digunakan untuk mengakses aplikasi backend yang sudah dibuat.

Langkahnya adalah sebagai berikut:
1. Membuka kembali halaman dashboard dari Railway
1. Pilih nama `services` yang sudah dibuat
1. Pilih tab `Settings`, pada bagian `Environment`, Menekan tombol `Generate Domains`.
1. Setelah menunggu beberapa detik, maka akan muncul nama `domain` yang bisa digunakan untuk mengakses backend yang kita miliki, e.g.: `https://nama-dari-services.up.railway.app`

Dan selesai, yay !

Sampai pada titik ini selesai sudah tahapan deploy aplikasi backend kita pada railway ! Hore !!!

Selanjutnya adalah tahapan untuk deploy aplikasi frontend kita pada Firebase.

### Frontend with Firebase
Sama seperti dengan backend, ada banyak cloud provider yang menyediakan fitur untuk mendeploy aplikasi web yang sudah kita buat secara gratis seperti Vercel, Surge, Netlify, dan Firebase.

Pada pembelajaran ini kita akan mendeploy aplikasi frontend kita dengan menggunakan Firebase, lebih tepatnya adalah `Firebase Hosting`.

Firebase sendiri adalah suatu produk Google yang berisi sekumpulan fitur yang dapat mempermudah developer dalam membuat aplikasi, seperti storage, database, authentication, dan hosting.

Langkah-langkah deploynya adalah sebagai berikut:

#### Langkah 1 - Instalasi Firebase CLI
Pertama-tama, sebelum melakukan deployment, kita akan menginstall firebase-cli terlebih dahulu.  

Lagi-lagi cara termudah untuk menginstall firebase-cli adalah dengan menggunakan `npm`, dengan menggunakan perintah:

```shell
npm install -g firebase-tools
```

atau (untuk pengguna yarn) 

```shell
yarn global add firebase-tools
```

Sebenarnya ada cara lainnya untuk instalasi tanpa membutuhkan `npm`, untuk melihat cara lain untuk instalasi Firebase CLI bisa dilihat pada tautan [ini](https://firebase.google.com/docs/cli).

Kemudian setelah menginstall firebase-cli ini, kita bisa mengecek apakah firebase-cli ini sudah terpasang dengan mengecek version yang terpasang dengan perintah:

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
Langkah selanjutnya adalah kita akan membuat project dan nama aplikasi yang akan dideploy pada firebase.

Supaya dapat melakukan hosting frontend kita pada firebase, kita akan diminta untuk membuat sebuah project sebagai unique identifier dari aplikasi frontend yang akan di-deploy.

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
Sama seperti deployment backend pada Railway, untuk deployment frontend pada firebase, kita juga akan melakukan beberapa modifikasi kode supaya siap untuk dideploy.

Pada frontend ini sendiri kode yang diubah (apabila dibuat dengan cukup baik), adalah hanya memodifikasi base endpoint nya saja.

Sehingga pada kode frontend kita ini, cukup hanya dengan membuka file `frontend/src/main.js`

```javascript
// File: src/main.js

// TODO: Change baseEndpoint to the project on cloud provider
// Railway = https://xxxx.up.railway.app
Vue.prototype.$baseEndpoint = "http://localhost:10000";
```

dan pada kode ini kita akan mengganti baseEndpoint menjadi endpoint Railway App yang sudah di-deploy sebelumnya, yaitu `https://learning-deploy-backend.up.railway.app`

Sehingga kode frontend kita ini sekarang akan menjadi

```javascript
// File: src/main.js

// TODO: Change baseEndpoint to the project on cloud provider
// Railway = https://xxxx.up.railway.app
Vue.prototype.$baseEndpoint = "https://learning-deploy-backend.up.railway.app";
```

Perhatikan pada alamat di atas, kita menggunakan HTTPS dan sudah tidak menggunakan port lagi.

#### Langkah 5 - Build the Apps
Dikarenakan kita menggunakan vuejs di dalam aplikasi frontend ini, maka kita perlu untuk mmembuat atau mem-`bundle` aplikasinya terlebih dahulu. 

Dalam pembelajaran kali ini, kita akan membundle aplikasi frontend kita dengan `parcel`.

(Apabila menggunakan bundler yang lain, e.g. webpack / vite, disesuaikan saja yah !)

Kita akan memodifikasi file `package.json` dan menambahkan perintah untuk mem-bundle aplikasi dalam mode production.

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

Dengan menambahkan perintah atau run script `build` tersebut, kita akan mem-bundle aplikasi frontend yang dibuat dan diletakkan pada folder `www` di dalam folder aplikasi frontend.

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

Perhatikan bahwa pada langkah ini, akan terbentuk sebuah folder baru dengan nama `www` yang berisi file yang akan digunakan untuk deploy pada firebase.

#### Langkah 6 - Deploy the Apps
Langkah selanjutnya adalah kita akan men-deploy aplikasi frontend kita pada firebase.

Untuk ini kita akan menginisialisasi konfigurasi firebase project dengan menggunakan perintah:

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

Kemudian kita hanya butuh untuk menunggu hingga deploy selesai, dan akan diberikan informasi link hosting aplikasi frontend kita

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

Kemudian kita tinggal mencoba untuk membuka aplikasi yang sudah dihosting pada URL tersebut dan *voila* aplikasi sudah terdeploy !

Sampai pada tahap ini artinya kita sudah berhasil mendeploy aplikasi backend dan frontend yang ada pada tempat yang terpisah dan hampir semuanya menggunakan CLI saja !

Selamat !

## Referensi
- https://docs.railway.app/develop/cli
- https://docs.railway.app/develop/services
- https://firebase.google.com/docs/cli
