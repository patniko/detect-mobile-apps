using System;

using Foundation;
using UIKit;
using FFImageLoading.Forms.Touch;
using System.Threading.Tasks;
using HockeyApp.Helpers;
using HockeyApp.Services;
using HockeyApp.iOS.Helpers;
using HockeyApp.Views;
using HockeyApp.ViewModels;
using Xamarin.Forms;
using Microsoft.AppCenter.Distribute;

namespace HockeyApp.iOS
{
    using HockeyApp.Resources;

    [Register("AppDelegate")]
    public partial class AppDelegate : Xamarin.Forms.Platform.iOS.FormsApplicationDelegate
    {
        public override bool FinishedLaunching(UIApplication app, NSDictionary options)
        {
            Forms.Init();
            ImageCircle.Forms.Plugin.iOS.ImageCircleRenderer.Init();
            CachedImageRenderer.Init();
            // In-app update setup should use the browser and not this app itself (can't possibly succeed)
            NSUserDefaults.StandardUserDefaults.SetString("true", "MSTesterAppUpdateSetupFailed");
            Distribute.DontCheckForUpdatesInDebug();

            // Code for starting up the Xamarin Test Cloud Agent
#if DEBUG
            Xamarin.Calabash.Start();
#endif

            UITabBar.Appearance.TintColor = new UIColor(red: 0.8f, green: 0.18f, blue: 0.39f, alpha: 1);
            LoadApplication(new App()
            {
                StartRegisterDeviceFlow = StartRegisterDeviceFlow
            });

            DependencyService.Register<OpenAppiOS>();
            UIApplication.SharedApplication.StatusBarStyle = UIStatusBarStyle.Default;
            return base.FinishedLaunching(app, options);
        }

        public override bool OpenUrl(UIApplication app, NSUrl url, NSDictionary options)
        {
            var uri = new Uri(url.ToString());
            if (uri.Scheme.Equals(AppResources.CustomUriScheme, StringComparison.InvariantCultureIgnoreCase))
            {
                ((App)Xamarin.Forms.Application.Current).OnInvokeUriScheme(new Uri(url.ToString()));
                return true;
            }

            return false;
        }

        public override bool ContinueUserActivity(UIApplication application, NSUserActivity userActivity, UIApplicationRestorationHandler completionHandler)
        {
            if (!string.IsNullOrEmpty(Settings.APIToken))
            {
                (App.Current as App).GoToApp(new Uri(userActivity.WebPageUrl.AbsoluteString));
                return true;
            }
            return false;
        }

        public void StartRegisterDeviceFlow(bool shouldShowUI)
        {
            EventTracker.TrackEvent(EventTracker.Name.RegisterDeviceStart);
            BeginInvokeOnMainThread(async () =>
            {
                if (shouldShowUI)
                {
                    var vc = UIStoryboard.FromName("RegisterDevice", null).InstantiateInitialViewController();
                    vc.ModalPresentationStyle = UIModalPresentationStyle.FullScreen;
                    UIApplication.SharedApplication.KeyWindow.RootViewController.PresentViewController(vc, true, null);
                }
                else
                {
                    var deviceInfo = DependencyService.Get<IDeviceInfo>();
                    var dataUrl = await AppCenterService.Shared.GetDeviceRegisterUrl(deviceInfo.Id, deviceInfo.Version);
                    var url = new NSUrl(dataUrl.RegistrationUrl);
                    await UIApplication.SharedApplication.OpenUrlAsync(url, new UIApplicationOpenUrlOptions());
                }
            });

        }

        // UI testing backdoor method
        [Export("SetApiToken:")]
        public NSString SetApiToken(NSString apiToken)
        {
            Settings.IsUiTest = true;
            Settings.APIToken = apiToken;
            return null;
        }

        // UI testing backdoor method
        [Export("ShowFeedbackPage:")]
        public NSString ShowFeedbackPage(NSString value)
        {
            Settings.IsUiTest = true;
            TesterAppFeedbackView.Show();
            return null;
        }
    }
}