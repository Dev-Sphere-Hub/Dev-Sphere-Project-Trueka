## BIENVENIDOS A:

![ScreenShot](https://res.cloudinary.com/dpiwmbsog/image/upload/v1690491883/trueka/logo_pbyiuz.png)
## TRUEKA -FRONTEND- 

![ScreenShot](https://res.cloudinary.com/dpiwmbsog/image/upload/v1690500563/trueka/TRUEKAHOME123_qhnd18.png)

</br>

## 👨‍💻 Dependencias
* Node 18.17.0
* react: 18.2.0
* Vite 4.3.9
* react-google-maps/api: 2.19.0
* reduxjs/toolkit: 1.9.5
* react-dom: 18.0.11
* react-router-dom: 6.11.2.
* axios: 1.4.0
* uuid:  9.0.0
* bootstrap": "5.3.0
* react-bootstrap: 2.8.0
* react-leaflet: 4.2.1
* react-redux: 8.1.1
* react-router-dom: 6.14.1
* react-toastify: 9.1.3
* socket.io: 4.7.1
* socket.io-client: 4.7.1
* sweetalert2: 11.7.20
* swiper: 10.0.4
* uuid: 9.0.0

</br>

* iconos
  * react-icons": 4.10.1,
  * IonIcons : 7.1.0, directamente en el HTML sin instalarlo.

</br>   

* para normalizar codigo
  * standard: 17.0.0


</br>

## 🚀 Caracteristica
* Landing page (página de presentación)
* Login con Google
* Sección exclusiva para el usuario.
* Geolocalización y filtrado por ubicación actual del usuario.
* Filtro por categorías y buscador.
* Publicación de productos.
* Transacciones: se pueden realizar intercambios de productos entre los usuarios.
* Sección de vista/detalle del producto, desde donde se puede realizar la oferta.
* Selector de productos a intercambiar (se pueden seleccionar 1+ productos a ofrecer).
* Chat integrado en las ofertas.
* Se visualiza el historial de solicitudes de transacciones.
* Sección de Modificación de los datos del usuario.
* Calificación del usuario y listado de calificaciones.

</br>

## 📦 Instalación
  * Clonamos el repo 
  ```bash
  ╭─pescado at rabioso in ~/
  ╰─± git clone https://github.com/No-Country/s9-12-t-nest-react.git
  ```
  * Accedemos al Cliente:
  ```bash
  ╭─pescado at rabioso in ~/
  ╰─± cd ./s9-12-t-nest-react/client 
  ```
  * Instalamos las dependencias necesarias:
  ```bash
  ╭─pescado at rabioso in ~//s9-12-t-nest-react/client 
  ╰─± npm install
  ```
  * Iniciamos la Applicación web
  ```bash
  ╭─pescado at rabioso in ~/s9-12-t-nest-react/client 
  ╰─± npm run dev
  ```


 <!--aca coloca el deploy  -->
## 🚀 Deploying

[![Deploy on Railway](https://railway.app/button.svg)](https://trueka-app-front-c6dsm.ondigitalocean.app/)

</br>

## 📷 Capturas de Pantalla

### 🥰 vista home filtro por distancia
![🛸 Vistazo Detalles](https://res.cloudinary.com/dpiwmbsog/image/upload/v1690491884/trueka/trueka4_qkumky.png "home filtro distancia")
### 🥰 vistazo al Perfil
![🛸 Vistazo Detalles](https://res.cloudinary.com/dpiwmbsog/image/upload/v1690493689/trueka/truekaHomeLike_mmvyle.png "perfil")

### 🥰 vistazo detalle + ubcacion de intercambio 
![🛸 Vistazo Detalles](https://res.cloudinary.com/dpiwmbsog/image/upload/v1690491884/trueka/trueka6_pakxgi.png "detalle")

### 🥰 vistazo detalle + ubcacion de intercambio 
![🛸 Vistazo Detalles](https://res.cloudinary.com/dpiwmbsog/image/upload/v1690494648/trueka/truejaCalificar_zslgnm.png "calificar")
</br>

## 💻🎨 Integrantes del Front-end

| <img src="https://res.cloudinary.com/dpiwmbsog/image/upload/v1686264426/PERFIL_GENERAL_hbngdm.jpg" height=60>| <img src="https://res.cloudinary.com/do5fnhctm/image/upload/v1690506050/121978726_k3oliw.png" height=60>|<img src="https://avatars.githubusercontent.com/u/51061931?v=4" height=60>| <img src="https://res.cloudinary.com/dptyezkoa/image/upload/v1690560237/IMG_20220628_201239_2_nnlcla.jpg" height=60>|
|:-:|:-:|:-:|:-:|
| **Guillermo Neculqueo** |

</br>


</br>



</br>

***

</br>

## TRUEKA - UI/UX -

</br>

<a href="link figma">
  <img src="https://img.shields.io/badge/Figma-%23F24E1E.svg?style=for-the-badge&logo=Figma&logoColor=white"/>
</a> 
<a href="LINK A TU CLOUDINARY">
  <img src="https://img.shields.io/badge/Cloudinary-%231563FF.svg?&style=for-the-badge&logo=google-cloud&logoColor=white"/>
</a>  


### 🎨 Arquitectura
![🛸 Vistazo Detalles](Link.img "dieño arquitectura")

### 🎨 User Story
![🛸 Vistazo Detalles](LInk.img "user story")

### <a href="Linkfigma"><img height="18px" src="https://img.icons8.com/color/344/figma--v1.png"/> Mockup</a>


</br>

***

## TRUEKA -BACKEND REST API-
![ScreenShot](https://res.cloudinary.com/dtuzmctzb/image/upload/v1690650697/apires_09_ctpp4e.png)

## 🚀 Servidor

Esta REST API consta de servidor NestJS con mongoDB y socket.io.

## 📦 Tecnologias

Para desarrollar el Backend se utilizo lo siguiente con conceptos de DevOps:
- NestJS
- Express
- MongoDB
- socket.io
...

## 🛠️ Installation
Localhost:
```sh
cd server
npm i
npm run start:dev
```
Cloud: hemos creado una droplet en DigitalOcean, se puede ejecutar con los siguientes comandos:
```sh
#clonar repo
git remote add origin https://github.com/No-Country/s9-12-t-nest-react.git
cd s9-12-t-nest-react
cd server
npm i
npm run start:dev

#node, nginx y pm2
sudo apt update
sudo systemctl status nginx
sudo systemctl start nginx
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt install nginx
sudo npm install pm2@latest -g
pm2 start dist/main.js --name trueka
pm2 startup systemd
pm2 save

#ssl
sudo add-apt-repository ppa:certbot/certbot
cd /etc/nginx/sites-available
nano /etc/nginx/sites-available/trueka
server {
	listen 80;
	server_name tu_dominio;
	location / {
		proxy_pass http://localhost:3000;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection 'upgrade';
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
	}
}
ln -s /etc/nginx/sites-available/trueka /etc/nginx/sites-enabled/trueka
server {
    listen 3001;
    server_name tu_dominio;  
	ssl_certificate /etc/ruta/certificado/dominio/fullchain.pem;
    ssl_certificate_key /etc/ruta/key/dominio/privkey.pem;
    location / {
        proxy_pass http://127.0.0.1:8001;
	proxy_http_version 1.1;
	proxy_set_header Upgrade $http_upgrade;
	proxy_set_header Connection 'upgrade';
	proxy_set_header Host $host;
	proxy_cache_bypass $http_upgrade;
    }
}

ln -s /etc/nginx/sites-available/trueka /etc/nginx/sites-enabled/trueka
ln -s /etc/nginx/sites-available/truekachat /etc/nginx/sites-enabled/truekachat
sudo ufw allow 8001
sudo ufw allow 3001
sudo service nginx restart
#certs
sudo apt update
sudo apt install snapd
sudo apt-get remove certbot
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --nginx
sudo certbot renew --dry-run
sudo service nginx restart
```

## 📦 Contenedores
![ScreenShot](https://res.cloudinary.com/dtuzmctzb/image/upload/v1690651483/droplet_e9b0ws.png)

## 🚀 DEPLOY URL
[![Deploy on DigitalOcean](https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/DigitalOcean_logo.svg/240px-DigitalOcean_logo.svg.png)](https://backendrestfullseleccionado.online/api)
