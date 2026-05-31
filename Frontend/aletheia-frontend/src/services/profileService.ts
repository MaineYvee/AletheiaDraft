import apiClient
    from "../api/axios";

export const getProfile =
    async () => {

        const response =
            await apiClient.get(
                "/users/profile"
            );

        return response.data;
    };

export const changePassword =
    async (
        oldPassword: string,
        newPassword: string
    ) => {

        return apiClient.patch(
            "/auth/change-password",
            {
                oldPassword,
                newPassword
            }
        );
    };

export const uploadProfilePicture =
    async (
        file: File
    ) => {

        const formData =
            new FormData();

        formData.append(
            "file",
            file
        );

        const response =
            await apiClient.post(
                "/users/profile-picture",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

        return response.data;
    };