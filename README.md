<p align="center">
  <img src="client/public/favicon.svg" alt="Who Unfollowed Me logo" width="80" />
</p>

<h1 align="center">Who Unfollowed Me</h1>

<p align="center">
  Upload your Instagram data export and see who you follow that doesn't follow you back.<br />
  Everything runs in your browser. Your file never leaves your device.
</p>

<p align="center">
  <a href="https://whounfollowedmeweb.vercel.app">https://whounfollowedmeweb.vercel.app</a>
</p>

---

## What it does

Instagram lets you download your data as a zip file. This app reads that zip, finds your followers and following lists, compares them by username, and shows everyone you follow who doesn't follow you back. Each name links to their profile, and the list scrolls so long results stay tidy.

## Heads up

An Instagram export is a snapshot of one moment. So the app shows who **isn't following you back right now**, not who unfollowed you or when. Spotting a real unfollow would mean comparing two exports taken at different times.

## How to use it

1. In Instagram, open **Accounts Center**, then **Your information and permissions**.
2. Choose **Export your information** and create a new export.
3. Choose **Export to device**.
3. Select **Followers and following** as the data to include.
4. Set the format to **JSON** and the date range to **All time**, then submit the request.
5. When Instagram emails you, download the `.zip` file.
6. Open the site, drop the zip in, and click **Who Unfollowed Me?**

Instagram renames its menus now and then, so the steps may look a little different.

## Privacy

There is no backend. The zip is opened in your browser tab with JSZip, the lists are compared on your device, and nothing is uploaded anywhere.

## Built with

- React and TypeScript
- Vite

## Run it locally

You need Node 20.19+ or 22.12+.

```bash
git clone https://github.com/YOUR-USERNAME/Who-Unfollowed-Me.git
cd Who-Unfollowed-Me/client
npm install
npm run dev
```

Then open the address Vite prints.

## Made by

Shourjo Maitra 🖤