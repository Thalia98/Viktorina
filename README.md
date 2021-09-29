# Viktorina
Juego de preguntas nivel competitivo

## Instalación

```
npm install -g ionic                    # Esto sólo la primera vez, si todavía no tienes ionic.
npm install                             # Para instalar los paquetes del proyecto
ionic cordova platform add android      # Si queremos compilar para Android
ionic cordova platform add ios          # Solo en macOS, si queremos compilar para iOS.
```

## Build de desarrollo

### Navegador
Ejecutar `ionic serve` para ver los cambios mientras se escribe código.

### Android
Para ver el listado de dispositivos virtuales de ios que hay creados ejecutar:
```
ionic cordova emulate android --list
```

Una vez sepamos que dispositivo queremos emular, lo ejecutamos con, siendo "Pixel_3_API_29" el ID del dispositivo seleccionado anteriormente:
```
ionic cordova run android --liveroad --target "Pixel_3_API_29"
```

## Build de producción

En `resources` hay que cambiar el `icon.png` y el `splash.png` por el que deseemos. Luego ejecutar `ionic cordova resources`.

Subir el `fondo del login` y el `logo de la empresa` como background.png y logo.png en la carpeta `src/assets/images/`.

Cada vez que se vaya a subir una build a producción hay que incrementar el `version="0.0.1"`.

Luego hacer `ionic cordova build android --prod --release --buildConfig` para android.

### Cómo hacer una nueva build y subirla a Play Store
#### Revisar versión del build
En el archivo `config.xml` se encuentra la versión actual en el parámetro widget > version. Si se realiza una nueva subida habría que aumentar la versión.

#### Generación de APK firmado: Opción 1 (recomendada)
1. Metemos en el proyecto los archivos de `build.json` y `google-services.json` alojados en el Drive del proyecto.

2. Ejecutamos el build en producción:
```
ionic cordova build android --prod --release
```

#### Generación de APK firmado: Opción 2 (no recomendada)
1. Ejecutamos el build en producción:
```
ionic cordova build android --prod --release
```
2. Firmamos el apk generado:
```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore "Work&Roll-GooglePlay.keystore" "./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk" "Work&Roll"
```
Nos pedirá 2 contraseñas: El passphrase y la contraseña del alias Work&Roll. Esas contraseñas están en el `build.json`.

3. Alineamos APK:
```
set SUBFILENAME=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2% "[RUTA_ANDROID]\Android\Sdk\build-tools\29.0.2\zipalign" -v 4 "./platforms/android/app/build/outputs/apk/release/app-release.apk" "Signed-%SUBFILENAME%.apk"
```

#### Generación de la nueva build

## Errores al compilar

1. Estos errores no los debería dar, porque ionic debería copiar los archivos y aplicar la configuración, pero no lo hace:
Lo tengo en la raiz, en /src y en /src/app, y he regenerado el proyecto de android, pero aun así no lo copia.

`Error` no se encuentra `google-services.json`
`Copiar google-services.json a platforms/android/app`

2. Si al ejecutar `ionic cordova run android` da un error por no tener definido ANDROID_SDK_ROOT, hay que ejecutar los siguientes comandos:
```
export ANDROID_HOME=~/Library/Android/sdk/
export ANDROID_SDK_ROOT=~/Library/Android/sdk
export PATH=$ANDROID_HOME/platform-tools:$PATH
export PATH=$ANDROID_HOME/tools:$PATH
```


EN macos, en caso de error gradle `tools.jar` ejecutar, comprobar que el path sea correcto
```
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_202.jdk/Contents/Home
```

#### Git flow

##### Actualizar cambios locales desde remoto
git pull --rebase

##### Crear rama y cambiar a esa nueva rama
git checkout -b new-feature-branch-name

##### Subir rama al repo
git push origin new-feature-branch-name

##### Actualizar rama local con main
git pull --rebase origin main

##### Merge main
git checkout main && \
git pull --revase && \
git merge new-feature-branch-name && \
git push

## Acceso
Para acceder a la aplicación sin necesidad de registrarse hay dos cuentas:
```
Email: xaxu2009.tgs@gmail.com
Pass: 123456
```

```
Email: xaxu2009.tgs+prueba2@gmail.com
Pass: 123456
```

