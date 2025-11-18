import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { useState } from "react";
import { useSession } from "@/contexts/AuthContext";
import { Button, ButtonText } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { AddIcon, Icon } from "@/components/ui/icon";
import { Text } from "react-native";
import { Typography } from "@/constants/Typography";
import * as ImagePicker from "expo-image-picker";
import useUpdateProfile from "@/hooks/user/useUpdateProfile";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function ProfileForm() {
  const { user } = useSession();
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const [image, setImage] = useState<string | undefined>(undefined);
  const [bio, setBio] = useState<string | undefined>(user?.bio ?? "");
  const [email, setEmail] = useState<string>(user?.email ?? "");
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpdateProfile = async () => {
    await updateProfile({ email, avatar: image, bio });
  };

  return (
    <VStack space="xl">
      <VStack space="xl" className={"items-center"}>
        <Avatar size="xl">
          <AvatarFallbackText>{user?.username}</AvatarFallbackText>
          {(image || user?.avatar) && (
            <AvatarImage
              source={{
                uri: (image || user?.avatar) as string,
              }}
            />
          )}
        </Avatar>
        <Button className="rounded-full" onPress={pickImage}>
          <Icon className="color-white" as={AddIcon} />
          <ButtonText>Ajouter une photo</ButtonText>
        </Button>
        <Text
          style={{
            fontFamily: Typography.fonts.medium,
            color: Colors.light.primary,
          }}
          className="text-5xl"
        >
          {`${user?.username[0].toUpperCase()}${user?.username.slice(1)}`}
        </Text>
      </VStack>
      <FormControl>
        <Textarea size="lg" className="w-full">
          <TextareaInput
            placeholder={"Bio"}
            value={bio ?? ""}
            onChangeText={setBio}
            maxLength={150}
          />
        </Textarea>
        <FormControlHelper className={"self-end"}>
          <FormControlHelperText>{`${bio?.length} / 150`}</FormControlHelperText>
        </FormControlHelper>
        <Input className={"my-1"} variant="rounded" size={"xl"}>
          <InputField
            type={"text"}
            placeholder={"Email"}
            value={email}
            onChangeText={setEmail}
          />
        </Input>
      </FormControl>
      <Button
        className="rounded-full"
        variant="outline"
        size="xl"
        action="negative"
        onPress={() => router.navigate("/(profile)/delete-account")}
      >
        <ButtonText style={{ color: "#b91c1c" }}>
          {"Supprimer mon compte"}
        </ButtonText>
      </Button>
      <Button
        className="rounded-full"
        variant="outline"
        size="xl"
        action="primary"
        onPress={() => router.navigate("/(profile)/change-password")}
      >
        <ButtonText>{"Changer de mot de passe"}</ButtonText>
      </Button>
      <Button
        className="rounded-full"
        variant="solid"
        size="xl"
        action="primary"
        onPress={() => handleUpdateProfile()}
      >
        <ButtonText>{"Modifier"}</ButtonText>
      </Button>
    </VStack>
  );
}
