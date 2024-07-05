import React from "react"
import { Button, Image } from "@nextui-org/react"
import { beginKeyless } from "../../../features"

export const ContinueWithGoogleButton = () => {
    return (
        <Button
            fullWidth
            onPress={() => beginKeyless()}
            startContent={
                <Image removeWrapper className="w-5 h-5" src="/icons/google.svg" />
            }
            variant="flat"
        >
      Continue With Google
        </Button>
    )
}
