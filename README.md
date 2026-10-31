# Web-hap

- Hosting: All-Inkl-Webspace, Upload per FTP, Domain happiness-ev.com. DNS bei All-Inkl – MX-Einträge dort nicht ändern.
- GitHub: Repo und Vorschau unter https://sumy68.github.io/Hap-Website/ (noindex nur auf `*.github.io`, gesetzt in `main.js`).

## Upload-Paket

`.deploy/build.sh` erzeugt `deploy/` und `happiness-website.zip` im Repo-Root (nicht versioniert). Das Paket enthält zusätzlich `.deploy/.htaccess` und `.deploy/404.html`.

## Offene Punkte Datenschutz

Betrifft `datenschutz/index.html`. Der sichtbare Text trifft zu diesen Punkten bewusst keine Aussage.

### ALL-INKL.COM (Hosting)

- Auftragsverarbeitungsvertrag abschließen bzw. prüfen und ggf. im Text nennen.

### Formspree (Kontaktformular Startseite)

- Postanschrift der Formspree, Inc. ergänzen; die Privacy Policy nennt keine.
- Auftragsverarbeitungsvertrag prüfen und ggf. im Text nennen.
- Rechtsgrundlage der USA-Übermittlung klären (Data Privacy Framework oder Standardvertragsklauseln) und nennen.
- Speicherdauer bei Formspree ergänzen.

### Forminit, vormals Getform (Mitgliedsantrag)

- Auftragsverarbeitungsvertrag prüfen und ggf. im Text nennen.
- Mögliche Übermittlung ins Vereinigte Königreich klären: Der Anbieter sitzt in London, speichert laut eigenen Angaben aber auf Servern in EU-Regionen (AWS). Prüfen, ob trotzdem Zugriffe oder Übermittlungen aus dem Vereinigten Königreich stattfinden, und ggf. die Rechtsgrundlage nennen.
- Speicherdauer bei Forminit ergänzen.
