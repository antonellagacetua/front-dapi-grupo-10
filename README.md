# MoviePlay App Mobile

## Configuración del Entorno (Android) 🔧

### Instalar Dependencias

Es necesario Node, React-Native-Cli, Un JDK y Android Studio

### Instalar Node

Se recomienda instalar Node via Chocolatey (instalador de paquetes para Windows)

https://chocolatey.org/install

Abrir un Prompt como administrador y correr el siguiente comando:

choco install -y nodejs-lts microsoft-openjdk17

### Ambiente de Desarrollo para Android

Descargar e Instalar Android Studio:

https://developer.android.com/studio/index.html

Asegurarse que esten tildados los siguientes componentes:

Android SDK
Android SDK Platform
Android Virtual Device
Performance (Intel ® HAXM)

### Instalar Android SDK

Android Studio instala el último SDK de Android de forma predeterminada. Sin embargo, la creación de una aplicación React Native con código nativo requiere el Android 14 (UpsideDownCake) SDK en particular. Se pueden instalar SDK de Android adicionales a través del SDK Manager en Android Studio.

Para hacerlo, abra Android Studio, haga clic en el botón "Configure" y seleccione "SDK Manager".

Seleccione la pestaña "SDK Platforms" en SDK Manager, luego marque la casilla junto a "Show Package Details" en la esquina inferior derecha. Busque y expanda la opción Android 14 (UpsideDownCake), luego asegúrese de que los siguientes elementos estén marcados:

- Android SDK Platform 34

- Intel x86 Atom_64 System Image o Google APIs Intel x86 Atom System Image

A continuación, seleccione la pestaña "SDK Tools" y marque la casilla junto a "Show Package Details" aquí también. Busque y expanda la entrada "Android SDK Build-Tools", luego asegúrese de que la version 34.0.0 esté seleccionada.

Finalmente, haga clic en "Aplicar" para descargar e instalar el SDK de Android y las herramientas de compilación relacionadas.

### Configurar variable de entorno ANDROID_HOME

Las herramientas de React Native requieren que algunas variables de entorno sean configuradas en orden para desarrollar aplicaciones con codigo nativo.

Abra el panel de control de Windows (Control Panel)
Seleccione Cuentas de Usuario y nuevamente Cuentas de Usuario (User Account)
Presione en modificar variables de entorno (Change My Enviroment Variables)
Presione en Nueva y cree la variable de usuario ANDROID_HOME apuntando al path del Android SDK instalado:

El SDK se instala, por defecto, en la siguiente ubicacion:

%LOCALAPPDATA%\Android\Sdk

Puede encontrar la ubicacion especifica del SDK dentro de Android Studio, en el dialogo de configuracion, bajo Languages & Frameworks → Android SDK.

Verifique que la variable de usuario haya sido añadida antes de proceder.

Agregar el path a las herramientas de la plataforma (Android Platform Tools)


Abra el panel de control de Windows (Control Panel)
Seleccione Cuentas de Usuario y nuevamente Cuentas de Usuario (User Account)
Presione en modificar variables de entorno (Change My Enviroment Variables)}
Seleccione la variable PATH
Presione en Editar
Presione en Nueva y agregue la dirección a Platform-tools a la list

La ubicación por defecto de la carpeta de platform-tools es la siguiente:

%LOCALAPPDATA%\Android\Sdk\platform-tools

### Abrir el emulador de Android

Seleccione "Create Virtual Device...", luego elija cualquier teléfono de la lista y haga clic en "Next", luego seleccione la imagen UpsideDownCake API Nivel 34.

Click "Next" then "Finish" to create your AVD. At this point you should be able to click on the green triangle button next to your AVD to launch it.

## Para correr la aplicación en Android :rocket: :robot:

Una vez configurado el entorno, abrir la terminal en la ubicacion del proyecto y ejecutar:

```

npx react-native run-android

```

## Autores ✒️


- **Antonella Daiana Gacetua** - _Desarrollador_ [Antonella Daiana Gacetua]()
- **Luis Jose Javier Marchant Rojas** _Desarrollador_ [Luis Jose Javier Marchant Rojas ]()
- **Matias Joel Escobar** _Desarrollador_ [Matias Joel Escobar]()
- **Facundo Carlos Pietra** _Desarrollador_ [Facundo Carlos Pietra]()
- **Ezequiel Alberto Gonzalez Nicolini** _Desarrollador_ [Ezequiel Alberto Gonzalez Nicolini]()
