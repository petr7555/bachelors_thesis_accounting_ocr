#include "pch.h"
#include "FilePicker.h"
#include <winrt/Windows.Storage.h>
#include <winrt/Windows.Storage.Pickers.h>
#include <winrt/Windows.Foundation.h>
#include <winrt/Windows.Security.Cryptography.h>

using namespace winrt;
using namespace winrt::Windows::Storage;
using namespace winrt::Windows::Storage::Pickers;
using namespace winrt::Windows::Security;

namespace FilePicker {
    void FilePicker::Initialize(RN::ReactContext const& reactContext) noexcept {
        m_reactContext = reactContext;
    }

    winrt::fire_and_forget FilePicker::pickFile(RN::ReactPromise<RN::JSValueObject> promise) noexcept
        try {
        FileOpenPicker filePicker;
        filePicker.ViewMode(PickerViewMode::Thumbnail);
        filePicker.SuggestedStartLocation(PickerLocationId::PicturesLibrary);
        filePicker.FileTypeFilter().ReplaceAll({ L".jpg", L".jpeg", L".png" }); // Allowed File types

        try {
            StorageFile file{ co_await filePicker.PickSingleFileAsync() };
            try {
                if (file) {
                    // copy file to temporary folder to be able to access it later
                    // https://github.com/microsoft/react-native-windows/issues/4255
                    StorageFile tempFile{ 
                        co_await file.CopyAsync(ApplicationData::Current().TemporaryFolder(), file.Name(), NameCollisionOption::GenerateUniqueName) 
                    };
                    
                    if (tempFile) {
                        try {
                            Streams::IBuffer buffer{ co_await FileIO::ReadBufferAsync(tempFile) };
                            std::wstring base64Content{ Cryptography::CryptographicBuffer::EncodeToBase64String(buffer) };
                            RN::JSValueObject result;
                            result["path"] = to_string(tempFile.Path());
                            result["mime"] = to_string(tempFile.ContentType());
                            result["data"] = to_string(base64Content);
                            promise.Resolve(result);
                        }
                        catch (const hresult_error& ex) {
                            promise.Reject(RN::ReactError{ "Couldn't encode picked file to base64", to_string(ex.message()).c_str() });
                        }
                    }
                    else {
                        promise.Reject("Couldn't copy file to TemporaryFolder");
                    }
                }
                else {
                    promise.Reject("No file was picked");
                }
            }
            catch (const hresult_error& ex) {
                promise.Reject(RN::ReactError{ "Couldn't copy file to TemporaryFolder", to_string(ex.message()).c_str() });
            }
        }
        catch (const hresult_error& ex) {
            promise.Reject(RN::ReactError{ "Unable to FilePicker.PickSingleFileAsync", to_string(ex.message()).c_str() });
        }

    }
    catch (const hresult_error& ex) {
        promise.Reject(RN::ReactError{ "Unable to set FilePicker options", to_string(ex.message()).c_str() });
    }
}
