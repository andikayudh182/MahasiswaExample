# Andika_Hasbi_JTK-Polban

Exercise Validation 1000 Record Data Mahasiswa From CSV to Postgre with PEVN Stack 

## Getting Started
Berikut beberapa tahapan untuk menjalankan server backend dan frontend secara lokal

## Backend
### Installation


1. Clone repository
   ```sh
   git clone https://github.com/andikayudh182/MahasiswaExample.git
   ```
2. Extract zip
3. Open folder backend/config/config.json
4. Setting config.json <br> 
    "username": "yourusername", <br>
    "password": "yourpass", <br>
    "database": "yourdb", <br> 
    "host": "127.0.0.1", <br>
    "dialect": "postgres"
5. Kembali ke folder backend dan jalankan perintah ``` npm install ``` untuk mendownload node modules
6. Jalankan perintah ``` nodemon ``` pada folder backend untuk menjalankan server
7. Kemudian lakukan db migration dengan perintah ``` sequelize db:migrate ``` dan pastikan apakah table sudah berhasil digenerate ke dalam postgre

### Import Data CSV Mahasiswa to Postgre/ pgAdmin 4
1. Open pgAdmin
2. Klik kiri  servers-> PostgreSQL -> Databases 
3. Kemudian klik kiri namadb -> Schemas -> Tables 
4. Lalu pilih table mana yang akan dilakukan import dengan klik kanan dan pilih menu `Import \ Export`
5. Ubah menu export menjadi import 
6. Pada filename klik untuk memilih direktori dari file csv yang akan diimport
7. Pada format pilih csv
8. Untuk encoding pilih UTF8
9. Ubah header menjadi Yes dengan klik kiri
10. Delimiter yang digunakan adalah tanda ',' (koma)
11. Klik Ok pada kanan bawah

### Dependencies
![image](https://user-images.githubusercontent.com/61397720/178680342-5463a24e-2857-4f6d-9a87-6fcb6a3743aa.png)
