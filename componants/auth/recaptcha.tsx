import { firebaseConfig } from "@/lib/firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

export default function RecaptchaVerifier({
    verifierRef,
}: {
    verifierRef: React.RefObject<FirebaseRecaptchaVerifierModal | null>
}) {
    return (
        <FirebaseRecaptchaVerifierModal
            ref={verifierRef}
            firebaseConfig={firebaseConfig}
        />
    );
};
