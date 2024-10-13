import { useUser } from "@/composables/auth/user";
import { auth_api } from "@/apiFactory/modules/auth";
import { useCustomToast } from '@/composables/core/useCustomToast'

const credential = {
  passcode: ref(""),
  phoneNumber: ref(""),
};

export const use_auth_login = () => {
  const router = useRouter();
  const loading = ref(false);
  const { showToast } = useCustomToast();

  const isFormDisabled = computed(() => {
    return (
      loading.value || !credential.passcode.value || !credential.phoneNumber.value
    );
  });

  const login = async () => {
    loading.value = true;
    const res = (await auth_api.$_login({
      passcode: credential.passcode.value,
      phoneNumber: credential.phoneNumber.value,
    })) as any;
    loading.value = false;
    if (res.type !== "ERROR") {
      useUser().createUser(res.data);
      showToast({
        title: "Success",
        message: "We’ve sent you an email. Kindly click on the link to verify your account and access the App.",
        toastType: "success",
        duration: 3000
      });
      router.push("/email-sent-success");
    }
  };
  return { credential, login, loading, isFormDisabled };
};
