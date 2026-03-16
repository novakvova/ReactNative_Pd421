import FormLayout from "@/components/layouts/FormLayout";
import {useForm, Controller} from 'react-hook-form';
import {CreateCategoryFormData, createCategorySchema} from "@/schemas/categorySchema";
import {zodResolver} from '@hookform/resolvers/zod';
import CustomInput from "@/components/form/inputs/CustomInput";
import {useRouter} from "expo-router";
import {View} from "react-native";
import PrimaryButton from "@/components/form/buttons/PrimaryButton";
import AvatarPicker from "@/components/form/AvatarPicker";
import {serialize} from "object-to-formdata";
import {useCreateCategoryMutation} from "@/store/apis/categoryApi";
import {ThemedText} from "@/components/themed-text";

const CreateCategoryScreen = () => {
    const router = useRouter();
    const [createCategory, {isLoading}] = useCreateCategoryMutation();

    const {control, handleSubmit, setValue, formState: {errors}} = useForm<CreateCategoryFormData>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {name: '',
            description: '',
            image: undefined
        }
    });

    const onSubmit = async (data: CreateCategoryFormData) => {
        const formData = new FormData();
        console.log(data.image)
        formData.append("Name", data.name);
        formData.append("Description", data.description);

        formData.append("Image", {
            uri: data.image.uri,
            type: data.image.type,
            name: data.image.name
        } as any);


        const response = await createCategory(formData);
        console.log(response);
        router.push("/");
    }

    return (
        <>
            <FormLayout title="Welcome">
                <Controller
                    control={control}
                    name="image"
                    render={({field}) => (
                        <AvatarPicker
                            image={field.value?.uri || null}
                            onChange={(fileObject) => setValue('image', fileObject)}
                        />
                    )}
                />
                <ThemedText style={{color:"red", textAlign:"center"}}>{errors.image?.message}</ThemedText>
                <Controller
                    control={control}
                    name="name"
                    render={({field: {onChange, onBlur, value}}) => (
                        <CustomInput
                            label="Назва"
                            placeholder="Назва категорії"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.name?.message}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="description"
                    render={({field: {onChange, onBlur, value}}) => (
                        <CustomInput
                            label="Опис"
                            placeholder="Опис категорії"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.description?.message}
                        />
                    )}
                />

                <View className={"items-center w-full mt-4"}>
                    <PrimaryButton onPress={handleSubmit(onSubmit)} title={"Створити"}></PrimaryButton>
                    <PrimaryButton
                        title="Скасувати"
                        variant="secondary"
                        onPress={() => router.push('/')}
                    />
                </View>
            </FormLayout>
        </>
    )
}

export default CreateCategoryScreen;