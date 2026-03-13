import FormLayout from "@/components/layouts/FormLayout";
import {useForm, Controller} from 'react-hook-form';
import {CreateCategoryFormData, createCategorySchema} from "@/schemas/categorySchema";
import {zodResolver} from '@hookform/resolvers/zod';
import CustomInput from "@/components/form/inputs/CustomInput";
import {useRouter} from "expo-router";
import {View} from "react-native";
import PrimaryButton from "@/components/form/buttons/PrimaryButton";
import AvatarPicker from "@/components/form/AvatarPicker";

const CreateCategoryScreen = () => {

    const router = useRouter();

    const {control, handleSubmit, setValue, formState: {errors}} = useForm<CreateCategoryFormData>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {
            name: '',
            description: '',
            image: undefined
        }

    });

    const onSubmit = async (data: CreateCategoryFormData) => {
        console.log("Submitting data: ", data);
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
                <View className={"items-center w-full mt-4"}>
                    <PrimaryButton onPress={handleSubmit(onSubmit)}
                                   title={"Створити"}
                    />
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