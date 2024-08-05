# Smiirl Clock

Transform your unused Smiirl counter into a stylish clock with a Raspberry Pi. This project updates your Smiirl counter to display the current time.

## Prerequisites

- Raspberry Pi (e.g., Raspberry Pi Zero W or newer)
- MicroSD card (8 GB or more)
- Computer with an SD card reader
- Internet connection
- Wi-Fi network credentials
- Smiirl device ID and token

## Installation

### Step 1: Set Up Your Raspberry Pi

#### Get the Raspberry Pi OS Lite
- Visit the [Raspberry Pi OS Download page](https://www.raspberrypi.org/software/operating-systems/).
- Download the "Raspberry Pi OS Lite" version.

#### Install Raspberry Pi OS Lite on the SD Card
- Download and install the [Raspberry Pi Imager](https://www.raspberrypi.org/software/).
- Open the Raspberry Pi Imager.
- Select "Raspberry Pi OS (other)" -> "Raspberry Pi OS Lite (32-bit)".
- Choose your SD card and click "Write".

#### Prepare for Headless Setup
- Once the image is written, open the SD card on your computer.
- Enable SSH by creating an empty file named `ssh` in the root directory.
- Set up Wi-Fi by creating a file named `wpa_supplicant.conf` with the following content:

```plaintext
country=US
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="YOUR_SSID"
    psk="YOUR_PASSWORD"
    key_mgmt=WPA-PSK
}
```

Replace `YOUR_SSID` and `YOUR_PASSWORD` with your Wi-Fi details.

#### Boot Up and Connect
- Insert the SD card into your Raspberry Pi and power it on.
- Find your Raspberry Pi’s IP address (check your router).
- Connect via SSH:

```bash
ssh pi@raspberrypi.local
```
_Default username: `pi`, password: `raspberry`._

#### Install Node.js and npm
```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install nodejs npm
```

### Step 2: Install the Smiirl Clock Package

1. Open a terminal on your Raspberry Pi.
2. Install the Smiirl Clock package from npm:

```bash
npm install -g smiirl-clock
```

### Step 3: Run the Smiirl Clock Script

Run the script with your Smiirl device ID and token:

```bash
smiirl-clock YOUR_DEVICE_ID YOUR_TOKEN
```

You can find the counter ID and Token in your Smiirl CURL Details:
<img width="949" alt="image" src="https://github.com/user-attachments/assets/a283a4ff-d7c9-4531-94d6-dde620607133">

### Step 4: Autostart the Script Using crontab

To ensure the script runs on startup, add it to crontab:

#### Edit crontab:
```bash
crontab -e
```

#### Add the Following Line:
```plaintext
@reboot /usr/bin/node /usr/local/bin/smiirl-clock YOUR_DEVICE_ID YOUR_TOKEN >> /home/pi/smiirl-clock/cronlog 2>&1
```

Ensure the path to the script (`/usr/local/bin/smiirl-clock`) is correct.

## License
This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details.

## Author
Stefan Kunze - [@stefankunze](https://github.com/stefankunze)
