import ExpoModulesCore
import KakaoSDKCommon
import KakaoSDKAuth
import KakaoSDKUser

public class ExpoKakaoSdkModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoKakaoSdk')` in JavaScript.
    Name("ExpoKakaoSdk")
    
    OnCreate {
      guard let kakaoAppKey = Bundle.main.object(forInfoDictionaryKey: "KAKAO_APP_KEY") as? String else {
        print("Kakao App Key를 찾을 수 없습니다.")
        return
      }
      KakaoSDK.initSDK(appKey: kakaoAppKey)
      print("init success")
    }
    
    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants([
      "PI": Double.pi
    ])
    
    // Defines event names that the module can send to JavaScript.
    Events("onChange")
    
    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      return "Hello world! 👋"
    }
    

    AsyncFunction("setValueAsync") { (value: String) in
      // Send an event to JavaScript.
      self.sendEvent("onChange", [
        "value": value
      ])
    }
    
    // Enables the module to be used as a native view. Definition components that are accepted as part of the
    // view definition: Prop, Events.
    View(ExpoKakaoSdkView.self) {
      // Defines a setter for the `name` prop.
      Prop("name") { (view: ExpoKakaoSdkView, prop: String) in
        print(prop)
      }
    }
    
    // 카카오 로그인 함수 - AsyncFunction 사용
    AsyncFunction("kakaoLogin") { (promise: Promise) in
      if UserApi.isKakaoTalkLoginAvailable() {
        UserApi.shared.loginWithKakaoTalk { oauthToken, error in
          if let error = error {
            print(error)
            promise.reject("LoginError", "카카오 로그인 실패: \(error.localizedDescription)")
          } else if let token = oauthToken {
            print("success token:",token)
            let tokenInfo = ["accessToken": token.accessToken, "refreshToken": token.refreshToken]
            promise.resolve(["oauthToken": tokenInfo, "success": true])
          }
        }
      } else {
        UserApi.shared.loginWithKakaoAccount { oauthToken, error in
          if let error = error {
            promise.reject("LoginError", "카카오 로그인 실패: \(error.localizedDescription)")
          } else if let token = oauthToken {
            let tokenInfo = ["accessToken": token.accessToken, "refreshToken": token.refreshToken]
            promise.resolve(["oauthToken": tokenInfo, "success": true])
          }
        }
      }
    }.runOnQueue(.main)
    
    AsyncFunction("getAuthUser") { (promise:Promise) in
      UserApi.shared.me() { (user, error) in
        if let error = error {
          print(error.localizedDescription)
          promise.resolve(["authUser": nil])
        } else if let user = user {
          print("avatar:",user.kakaoAccount?.profile?.profileImageUrl as Any)
          print("avatar:",user.kakaoAccount?.profile?.thumbnailImageUrl)
          let userInfo = [
            "userId": user.id,
            "email": user.kakaoAccount?.email,
            "nickname": user.kakaoAccount?.profile?.nickname,
            "avatar": user.kakaoAccount?.profile?.profileImageUrl as Any
          ] as [String : Any]
          promise.resolve(["authUser": userInfo])
        }
      }
    }
  }
}
