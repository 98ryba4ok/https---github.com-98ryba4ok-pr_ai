from django.urls import path # type: ignore
from .views import (
    RegisterSendCodeView, RegisterVerifyCodeView,
    LoginSendCodeView, LoginVerifyCodeView, UserRootView, MeView, LogoutView, ChangePasswordView
)
from rest_framework_simplejwt.views import TokenRefreshView # type: ignore
urlpatterns = [
    path("", UserRootView.as_view(), name="user_root"),
    path("register/send-code/", RegisterSendCodeView.as_view(), name="register_send_code"),
    path("register/verify-code/", RegisterVerifyCodeView.as_view(), name="register_verify_code"),
    path("login/send-code/", LoginSendCodeView.as_view(), name="login_send_code"),
    path("login/verify-code/", LoginVerifyCodeView.as_view(), name="login_verify_code"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("me/", MeView.as_view(), name="user_me"),
    path("logout/", LogoutView.as_view(), name="user_logout"),
    path("change-password/", ChangePasswordView.as_view(), name="change_password"),
    
    
]
