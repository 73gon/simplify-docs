# SimpTrack Whitepaper

Monitor invoice and workflow processes in JobRouter centrally, keep process data transparent, and give users direct access to the views and actions they need every day.

SimpTrack is a dashboard widget for JobRouter that brings running invoice and workflow processes together in one configurable table. Instead of opening individual processes one by one, users work from a consolidated overview that can be filtered, sorted, adjusted, and exported.

With SimpTrack, you receive a ready-made widget for operational process tracking that combines JobRouter process data with a flexible, user-friendly table interface. As a result, you benefit from several advantages at once:

- Your invoice and workflow processes are visible in one central JobRouter dashboard.
- Your users can filter, sort, and adapt their own working view without technical support.
- Your process documents and histories remain directly accessible from the table.
- Your frequently used views can be saved as filter presets and reused at any time.
- Your administrators configure columns, filters, actions, branding, and permissions in one file.

Thanks to the SimpTrack dashboard widget, teams can shorten the path from process monitoring to action. Users see the relevant processes immediately, narrow down large data sets with filters, open documents or process histories directly, and export the currently relevant data to Excel when needed. Personal settings such as active filters, column order, visible columns, and zoom level are saved automatically, so each user can continue working with a familiar view the next time the widget is opened.

For administrators and integrators, SimpTrack keeps implementation clear. The widget is delivered as a ready-made release zip and is configured through `config.php`. This single configuration source defines the data view, JobRouter base URL, secure tracking passphrase, table columns, filters, row actions, optional role restrictions, and customer-specific branding.

## Features

- **Central process overview.** SimpTrack bundles invoice and workflow processes in one JobRouter dashboard table. Users can scan process data, status information, and relevant columns without switching between many individual process views.

- **Powerful filtering and sorting.** Users can narrow down data with text filters, dropdown filters, numeric ranges, date ranges, and yes/no filters. The table updates automatically and can be sorted by clicking column headers.

- **Reusable filter presets.** Frequently used filter combinations can be saved as presets. Users can apply them quickly, manage them in the settings, reorder them, hide them, rename them, or delete them.

- **Personalized table views.** Users can reorder columns by drag-and-drop, hide or show columns, adjust the zoom level between 50 percent and 200 percent, and switch between light and dark mode. These personal preferences are saved automatically.

- **Direct process and document access.** Row actions can open the process history or invoice document directly from the table. Which actions are visible can be controlled through configuration and permissions.

- **Excel export included.** Users can export all currently filtered data as an Excel file. The export respects visible columns, current formatting, and the matching records from the current view.

- **Efficient large-table navigation.** Pagination, adjustable rows per page, horizontal and vertical scrolling, full-screen mode, and a dedicated toolbar make large process tables easier to work with.

- **Declarative configuration.** Columns, labels, alignment, filters, row actions, permissions, and branding are configured in `config.php`. The `FIELD_MAP` defines the default table structure, while users can still adapt their own view.

- **Simple deployment.** SimpTrack is delivered as a ready-made widget package for JobRouter. No customer-side build step is required; behavior is controlled through configuration.

- **Customer-specific branding.** The optional `THEME` configuration allows SimpTrack to be adapted to a customer's corporate design while keeping the standard widget behavior intact.
