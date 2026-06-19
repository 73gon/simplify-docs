# SimpTrack Whitepaper

Rechnungs- und Workflowprozesse in JobRouter zentral überwachen, Prozessdaten transparent halten und Anwendern direkten Zugriff auf die Ansichten und Aktionen geben, die sie im Arbeitsalltag benötigen.

SimpTrack ist ein Dashboard-Widget für JobRouter, das laufende Rechnungs- und Workflowprozesse in einer konfigurierbaren Tabelle bündelt. Statt einzelne Vorgänge nacheinander zu öffnen, arbeiten Anwender mit einer zentralen Übersicht, die gefiltert, sortiert, angepasst und exportiert werden kann.

Mit SimpTrack erhalten Sie ein fertiges Widget für das operative Prozess-Tracking, das JobRouter-Prozessdaten mit einer flexiblen und benutzerfreundlichen Tabellenoberfläche verbindet. Dadurch profitieren Sie von mehreren Vorteilen zugleich:

- Ihre Rechnungs- und Workflowprozesse sind in einem zentralen JobRouter-Dashboard sichtbar.
- Ihre Anwender können ihre Arbeitsansicht filtern, sortieren und selbst anpassen.
- Ihre Prozessdokumente und Prozesshistorien bleiben direkt aus der Tabelle erreichbar.
- Ihre häufig genutzten Ansichten können als Filtervorlagen gespeichert und jederzeit wiederverwendet werden.
- Ihre Administratoren konfigurieren Spalten, Filter, Aktionen, Branding und Berechtigungen in einer einzigen Datei.

Dank des SimpTrack Dashboard-Widgets verkürzen Teams den Weg von der Prozessüberwachung zur konkreten Aktion. Anwender sehen relevante Vorgänge sofort, grenzen große Datenmengen mit Filtern ein, öffnen Dokumente oder Prozesshistorien direkt und exportieren bei Bedarf die aktuell relevanten Daten nach Excel. Persönliche Einstellungen wie aktive Filter, Spaltenreihenfolge, sichtbare Spalten und Zoomstufe werden automatisch gespeichert, sodass jeder Anwender beim nächsten Öffnen mit der gewohnten Ansicht weiterarbeiten kann.

Für Administratoren und Integratoren bleibt die Einführung übersichtlich. SimpTrack wird als fertiges Release-Zip ausgeliefert und über `config.php` konfiguriert. Diese zentrale Konfigurationsquelle definiert Datenansicht, JobRouter-Basis-URL, sichere Tracking-Passphrase, Tabellenspalten, Filter, Zeilenaktionen, optionale Rollenbeschränkungen und kundenspezifisches Branding.

## Funktionen

- **Zentrale Prozessübersicht.** SimpTrack bündelt Rechnungs- und Workflowprozesse in einer JobRouter-Dashboard-Tabelle. Anwender können Prozessdaten, Statusinformationen und relevante Spalten prüfen, ohne zwischen vielen einzelnen Prozessansichten zu wechseln.

- **Leistungsfähiges Filtern und Sortieren.** Anwender grenzen Daten mit Textfiltern, Dropdown-Filtern, Zahlenbereichen, Datumsbereichen und Ja/Nein-Filtern ein. Die Tabelle aktualisiert sich automatisch und kann per Klick auf die Spaltenköpfe sortiert werden.

- **Wiederverwendbare Filtervorlagen.** Häufig genutzte Filterkombinationen lassen sich als Vorlagen speichern. Anwender können sie schnell anwenden, in den Einstellungen verwalten, neu sortieren, ausblenden, umbenennen oder löschen.

- **Personalisierte Tabellenansichten.** Anwender können Spalten per Drag-and-drop neu anordnen, Spalten ein- oder ausblenden, die Zoomstufe zwischen 50 Prozent und 200 Prozent anpassen und zwischen hellem und dunklem Design wechseln. Diese persönlichen Einstellungen werden automatisch gespeichert.

- **Direkter Zugriff auf Prozesse und Dokumente.** Zeilenaktionen können die Prozesshistorie oder das Rechnungsdokument direkt aus der Tabelle öffnen. Welche Aktionen sichtbar sind, kann über Konfiguration und Berechtigungen gesteuert werden.

- **Excel-Export inklusive.** Anwender können alle aktuell gefilterten Daten als Excel-Datei exportieren. Der Export berücksichtigt sichtbare Spalten, aktuelle Formatierungen und die passenden Datensätze der aktuellen Ansicht.

- **Effiziente Navigation in großen Tabellen.** Seitennavigation, einstellbare Einträge pro Seite, horizontales und vertikales Scrollen, Vollbildmodus und eine eigene Werkzeugleiste erleichtern die Arbeit mit umfangreichen Prozesstabellen.

- **Deklarative Konfiguration.** Spalten, Bezeichnungen, Ausrichtung, Filter, Zeilenaktionen, Berechtigungen und Branding werden in `config.php` konfiguriert. Die `FIELD_MAP` definiert die Standardstruktur der Tabelle, während Anwender ihre persönliche Ansicht weiterhin anpassen können.

- **Einfache Bereitstellung.** SimpTrack wird als fertiges Widget-Paket für JobRouter ausgeliefert. Beim Kunden ist kein Build-Schritt erforderlich; das Verhalten wird über die Konfiguration gesteuert.

- **Kundenspezifisches Branding.** Über die optionale `THEME`-Konfiguration kann SimpTrack an das Corporate Design eines Kunden angepasst werden, ohne das Standardverhalten des Widgets zu verändern.
