import { Client, CommunityRepository, UserRepository, } from "@amityco/ts-sdk";
import { auth } from "../firebase/firebase.service";

class AmityService {
    username: string;
    static client: Amity.Client;
    public isAmityInitialized: boolean;
    private static amityService: AmityService | undefined;
    static sessionHandler: Amity.SessionHandler;
    public static instanceCount = 0;

    private constructor(Username: string) {
        this.username = Username;
        this.isAmityInitialized = false;
    }

    private async initAmity() {

        try {
            const connected = Client.isConnected();
        }
        catch {
            console.log("No active user");
            // init required variables
            AmityService.client = Client.createClient(process.env.REACT_APP_API_KEY ?? '', process.env.REACT_APP_REGION);
            AmityService.sessionHandler = {
                sessionWillRenewAccessToken(renewal: Amity.AccessTokenRenewal) {
                    // for details on other renewal methods check session handler
                    renewal.renew();
                },
            };
            await AmityService.amityService!.login();
        } finally {
            this.isAmityInitialized = true;
            ++AmityService.instanceCount;
            console.log("Amity service is initialized")
        }
    }

    static async getAmityService(option?: { isSignIn?: boolean }) {
        if (AmityService.amityService == undefined) {
            const firebaseUser = auth.currentUser;
            const uid = firebaseUser?.uid;

            // create amity service
            AmityService.amityService = new AmityService(uid ?? 'default_user');
            await AmityService.amityService.initAmity();

            if (option?.isSignIn) {
                await AmityService.amityService.handleAdditionalInformation();
            }
        }
        return AmityService.amityService;
    }

    private async login() {
        await Client.login({ userId: this.username }, AmityService.sessionHandler);
    }

    private async handleAdditionalInformation() {
        await this.joinDefaultCommunity();
        await this.updateProfileUser();
    }

    private async joinDefaultCommunity() {
        await CommunityRepository.joinCommunity(process.env.REACT_APP_DEFAULT_COMMUNITY_ID!);
    }



    private async updateProfileUser() {
        const firebaseUser = auth.currentUser;
        const updatedUser = await UserRepository.updateUser(firebaseUser?.uid ?? '', {
            displayName: firebaseUser?.displayName ?? undefined,
            avatarCustomUrl: firebaseUser?.photoURL ?? undefined,

        })
        console.log("Updated display name: " + updatedUser.data.displayName);
    }
}

export default AmityService;