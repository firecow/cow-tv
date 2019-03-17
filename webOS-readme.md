# Connecting TV and PC
This section describes how to connect the webOS TV and PC. Either CLI or IDE can be used for the Developer Mode app.

## Connecting with CLI
Follow the instructions below to add the target TV with CLI:

## Run webOS TV CLI.

Execute ares-setup-device script. Then, select add.

ares-setup-device

name deviceinfo connection profile
-------- ------------------------ ---------- -------
emulator developer@127.0.0.1:6622 ssh tv

** You can modify the device info in the above list, or add new device.
? Select: (Use arrow keys)
> add
modify
remove

##Input the information of the target TV as below:

You do not need to enter the password. When using the Developer Mode app, a password is not required.
** You can modify the device info in the above list, or add new device.
- Select: add
- Enter Device Name: tv2
- Enter Device IP address: 10.123.45.67
- Enter Device Port: 9922
- Enter ssh user: prisoner
- Enter description: new device
- Select authentification: password
- Enter password:
- Save - Yes

name deviceinfo connection profile

tv2 prisoner@10.123.45.67:9922 ssh tv


##After adding a device, check the result with the command below:

ares-setup-device -list

Click the Key Server button in the Developer Mode app.

Key_Server_On.png

Get the key file from the webOS TV with the following command:

ares-novacom --device tv2 --getkey

There will be a command prompt to enter Passphrase. Enter the exact characters (case sensitive) as displayed on the TV screen.
Passphrase consists of 6 characters and is shown in the bottom left side of the Developer Mode app screen.

input passphrase [default: webos]:

Check the connection with the TV and PC with the following command:

ares-install --device tv2 --list

Now, you are ready to install and launch your app on the real TV. To find out how to install and launch your app on the TV, go to Installing and launching your app using CLI.