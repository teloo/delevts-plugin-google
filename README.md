Delevts Google plugin [![Build Status](https://travis-ci.org/teloo/delevts-plugin-google.svg?branch=master)](https://travis-ci.org/teloo/delevts-plugin-google)
==================

## Installation

This plugin has been installed in [delevts](https://github.com/teloo/delevts).

## Preparation

1. Open [Google Developers Console](https://console.developers.google.com).
2. Create project.
3. Open [APIs & auth] - [Consent screen].
    1. Set [EMAIL ADDRESS] and [PRODUCT NAME].
    2. Click [Save] button.
4. Open [APIs & auth] - [APIs].
    1. Enable Calendar API.
5. Open [APIs & auth] - [Credentials].
    1. Click [Create new Client ID].
    2. Select [Installed application] from [APPLICATION TYPE].
    3. Select [Other] from [INSTALLED APPLICATION TYPE].
    4. Click [Create Client ID].
6. Displays [CLIENT ID] AND [CLIENT SECRET].

## Usage

Write the config file.  
For example.

```json
{
  "clientId": "<Google OAuth client id>",
  "clientSecret": "<Google OAuth client secret>",
  "calendarId": "<Calendar id>"
}
```

Run this command.

```shell
$ delevts google /path/to/config.json
```

Opens the browser.  
Accept.

Copy the code and input it to console.

Displays the refresh token.  
Write the config file.

```json
{
  "clientId": "<Google OAuth client id>",
  "clientSecret": "<Google OAuth client secret>",
  "refreshToken": "<Google OAuth refresh token>",
  "calendarId": "<Calendar id>"
}
```

Run this command.

```shell
$ delevts google /path/to/config.json
```

## License

See [license](LICENSE) (MIT License).

## Authors

* teloo
