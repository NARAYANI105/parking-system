import java.util.Scanner;

class ParkingSystem {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("==== Parking System ====");
        System.out.println("1. Two Wheeler");
        System.out.println("2. Four Wheeler");
        System.out.print("Select Vehicle Type (1 or 2): ");

        int choice = sc.nextInt();

        if (choice == 1) {
            System.out.println("You selected Two Wheeler Parking");
        } 
        else if (choice == 2) {
            System.out.println("You selected Four Wheeler Parking");
        } 
        else {
            System.out.println("Invalid Choice");
        }

        sc.close();
    }
}
