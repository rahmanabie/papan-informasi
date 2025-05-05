export interface Settings {
  institutionName: string;
  footerText: string;
  bgColor: string;
  textColor: string;
  headerFontSize: string;
  headerFontFamily: string;
  headerFontWeight: string;
  headerTextColor: string;
  dateTimeFormat: string;
  tvStreamingTitle: string;
  defaultStreamUrl: string;
  showTVStreamingControls: boolean;
  showAnnouncementControls: boolean;
  announcementTitle: string;
  announcementFontSize: string;
  announcementScrollSpeed: number;
  announcementScrollDirection: 'up' | 'down';
  announcementBgColor: string;
  announcementTextColor: string;
  announcementBorderColor: string;
  enableAnnouncementEditing: boolean;
  // Running Text Widget settings
  runningTextBgColor: string;
  runningTextColor: string;
  runningTextScrollSpeed: number;
  runningTextDirection: 'left' | 'right';
  runningTextItems: string[];
  enableRunningText: boolean;
  runningTextDateBgColor: string;
  runningTextTimeBgColor: string;
}
